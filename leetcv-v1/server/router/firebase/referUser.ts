import { createFirestoreRouter } from "../custom/createFirestoreRouter";
import { z } from "zod";
import { generateRandomString } from "@constants/defaults";
import { TRPCError } from "@trpc/server";
import { Handle } from "data/models/Handle";

export const referRouter = createFirestoreRouter()
  .query("getReferralCode", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      const { id } = input;
      if (!id || typeof id !== "string" || id.trim() === "") {
        throw new Error("Invalid 'id' provided");
      }
      try {
        const resumeRef = ctx.firestore
          .collection("users")
          .doc(id)
          .collection("referralCode");
        const docRef = ctx.firestore.collection("users").doc(id);
        return await docRef.listCollections().then(async (collections) => {
          const subCollectionIds = collections.map((col) => col.id);
          if (subCollectionIds.includes("referralCode")) {
            const snapshot = await resumeRef.get();
            if (!snapshot.empty) {
              return snapshot.docs[0].data().code;
            }
          }
          const newCode = generateRandomString();
          await resumeRef.doc(id).set({
            code: newCode,
            refferedId: [],
          });
          return newCode;
        });
      } catch (error) {
        console.error("Error fetching referral code:", error);
        throw new Error("Unable to fetch referral code");
      }
    },
  })

  .mutation("setReferralCode", {
    input: z.object({
      id: z.string(),
      handle: z.string(),
      referralCode: z.string(),
    }),
    async resolve({ ctx, input }) {
      if (ctx.session?.user.id !== input.id) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User can only look up their own information",
        });
      }
      const handleRef = ctx.firestore.collection("usernames").doc(input.handle);
      const handleRecord = await handleRef.get();
      const targetHandle = handleRecord.data() as Handle;

      const resumeRef = ctx.firestore
        .collection("users")
        .doc(input.id)
        .collection("referralCode");
      const snapshot = await resumeRef.get();
      const currentUserCode = snapshot.docs[0]?.data()?.code;

      const senderCodeRef = ctx.firestore
        .collection("users")
        .doc(input.id)
        .collection("redeemedReferral");
      const senderIdnapshot = await senderCodeRef.get();
      const hasSenderId = senderIdnapshot.docs[0]?.data()?.code;

      if (currentUserCode === input.referralCode) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You can't use your own Referral code",
        });
      }

      if (hasSenderId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You have redeemed your Referral code",
        });
      }

      const userReferralCodeDoc = ctx.firestore
        .collection("users")
        .doc(targetHandle.userId)
        .collection("referralCode")
        .doc(targetHandle.userId);

      const userReferralCodeData = (await userReferralCodeDoc.get()).data();
      const existingReferredIds = userReferralCodeData?.refferedId || [];

      const updatedReferredIds = Array.from(
        new Set([...existingReferredIds, input.id])
      );

      userReferralCodeDoc.set(
        {
          code: input.referralCode,
          refferedId: updatedReferredIds,
        },
        {
          merge: true,
        }
      );

      ctx.firestore
        .collection("users")
        .doc(input.id)
        .collection("redeemedReferral")
        .doc(input.id)
        .set({
          code: input.referralCode,
          refferedId: targetHandle.userId,
        });

      function updateCount(
        docRef: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>
      ) {
        return docRef
          .get()
          .then((doc) => {
            if (doc.exists) {
              const currentCount = doc.data()?.count || 0;
              const newCount = Number(currentCount) + 1000;

              return docRef.set({
                count: newCount,
              });
            } else {
              return Promise.reject(new Error("Document not found"));
            }
          })
          .then(() => {
            console.log("Count updated successfully");
          })
          .catch((error) => {
            console.error("Error updating count: ", error);
          });
      }

      const docRef = ctx.firestore
        .collection("users")
        .doc(input.id)
        .collection("gpt-token")
        .doc(input.id);

      updateCount(docRef);

      const targetRef = ctx.firestore
        .collection("users")
        .doc(targetHandle.userId)
        .collection("gpt-token")
        .doc(targetHandle.userId);

      updateCount(targetRef);
    },
  })
  .query("getRefferalPeers", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      const peersRef = ctx.firestore
        .collection("users")
        .doc(input.id)
        .collection("referralCode");
      const peersSnapshot = await peersRef.get();
      const refferedPeers =
        peersSnapshot.docs[0]?.data()?.refferedId.length || 0;
      return refferedPeers;
    },
  });
