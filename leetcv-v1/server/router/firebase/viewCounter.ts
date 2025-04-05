import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createFirestoreRouter } from "../custom/createFirestoreRouter";
import { Handle } from "data/models/Handle";
import admin from "../firebaseAdmin";

export const viewCountRouter = createFirestoreRouter()
  .query("getCount", {
    input: z.object({
      id: z.string(),
      handle: z.string(),
      file: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userName = ctx.firestore.collection("usernames").doc(input.handle);
      const recordRef = await userName.get();
      if (!recordRef.exists) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "usernames not found",
        });
      }

      const handleTarget = recordRef.data() as Handle;

      const resumeRef = ctx.firestore
        .collection("users")
        .doc(handleTarget?.userId)
        .collection(input.file);

      // "viewCounter"

      const docRef = ctx.firestore
        .collection("users")
        .doc(handleTarget?.userId);
      return docRef.listCollections().then(async (collections) => {
        const subCollectionIds = collections.map((col) => col.id);
        if (subCollectionIds.includes(input.file)) {
          const snapshot = await resumeRef.get();
          return snapshot.docs[0].data().pageViews;
        }
        return ctx.firestore
          .collection("users")
          .doc(handleTarget.userId)
          .collection(input.file)
          .doc(handleTarget.userId)
          .set({
            pageViews: 0,
          });
      });
    },
  })

  .mutation("setCount", {
    input: z.object({
      handle: z.string(),
      count: z.number().optional(),
      file: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userNameRef = ctx.firestore
        .collection("usernames")
        .doc(input.handle);
      const userNameRecordRef = await userNameRef.get();
      if (!userNameRecordRef.exists) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "usernames not found",
        });
      }

      const userHandleTarget = userNameRecordRef.data() as Handle;

      ctx.firestore
        .collection("users")
        .doc(userHandleTarget.userId)
        .collection(input.file)
        .doc(userHandleTarget.userId)
        .set({
          pageViews: input.count,
        });
    },
  })

  .mutation("setOwnPortfolioCount", {
    input: z.object({
      handle: z.string(),
      count: z.number().optional(),
      file: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userNameRef = ctx.firestore
        .collection("usernames")
        .doc(input.handle);
      const userNameRecordRef = await userNameRef.get();
      if (!userNameRecordRef.exists) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "usernames not found",
        });
      }

      const userHandleTarget = userNameRecordRef.data() as Handle;

      ctx.firestore
        .collection("users")
        .doc(userHandleTarget.userId)
        .collection(input.file)
        .doc(userHandleTarget.userId)
        .set({
          pageViews: input.count,
          lastVisitedOn: admin.firestore.FieldValue.serverTimestamp(),
        });
    },
  })

  .mutation("recordVisit", {
    input: z.object({
      handle: z.string(),
      userName: z.string(),
      userId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userNameRef = ctx.firestore
        .collection("usernames")
        .doc(input.handle);
      const userNameRecordRef = await userNameRef.get();
      if (!userNameRecordRef.exists) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "usernames not found",
        });
      }
      const userHandleTarget = userNameRecordRef.data() as Handle;
      ctx.firestore
        .collection("users")
        .doc(userHandleTarget.userId)
        .collection("portfolio")
        .doc(userHandleTarget.userId)
        .set({
          status: "user visited",
          userName: input.userName,
          userId: input.userId,
          lastVisitedOn: admin.firestore.FieldValue.serverTimestamp(),
        });
    },
  })

  .mutation("recordLeetCVLaunchUsersList", {
    input: z.object({
      handle: z.string(),
      userName: z.string(),
      email: z.string(),
      userId: z.string(),
      source: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userNameRef = ctx.firestore
        .collection("usernames")
        .doc(input.handle);
      const userNameRecordRef = await userNameRef.get();
      if (!userNameRecordRef.exists) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "usernames not found",
        });
      }
      const userHandleTarget = userNameRecordRef.data() as Handle;
      await ctx.firestore
        .collection("users")
        .doc(userHandleTarget.userId)
        .collection("leetcv-launch")
        .doc(input.source)
        .set({
          event: input.source,
          source: input.source,
          handle: input.handle,
          userName: input.userName,
          email: input.email,
          userId: input.userId,
          lastVisitedOn: admin.firestore.FieldValue.serverTimestamp(),
        });
    },
  })

  .mutation("recordLeetLinkUsersList", {
    input: z.object({
      handle: z.string(),
      userName: z.string(),
      userId: z.string(),
      source: z.string().optional(),
    }),
    async resolve({ ctx, input }) {
      const userNameRef = ctx.firestore
        .collection("usernames")
        .doc(input.handle);
      const userNameRecordRef = await userNameRef.get();
      if (!userNameRecordRef.exists) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "usernames not found",
        });
      }
      const userHandleTarget = userNameRecordRef.data() as Handle;
      ctx.firestore
        .collection("users")
        .doc(userHandleTarget.userId)
        .collection("leetLink-url")
        .doc(userHandleTarget.userId)
        .set({
          event: "leetLink url",
          source: input.source,
          userName: input.userName,
          userId: input.userId,
          lastVisitedOn: admin.firestore.FieldValue.serverTimestamp(),
        });
    },
  })

  // .query("isReturningUser", {
  //   async resolve({ ctx }) {
  //     const userId = ctx.session?.user.id;

  //     if (!userId) {
  //       throw new Error("User not authenticated");
  //     }

  //     const currentYear = new Date().getFullYear().toString();
  //     const currentMonth = new Date()
  //       .toLocaleString("default", { month: "long" })
  //       .toLowerCase(); // e.g., 'july'

  //     const userRef = ctx.firestore.collection("users").doc(userId);
  //     const returnedUserRef = userRef
  //       .collection("returning-user")
  //       .doc(currentYear);

  //     try {
  //       const doc = await returnedUserRef.get();

  //       if (!doc.exists) {
  //         await returnedUserRef.set({
  //           [currentMonth]: true,
  //         });
  //       } else {
  //         await returnedUserRef.update({
  //           [currentMonth]: true,
  //         });
  //       }
  //     } catch (error) {
  //       console.error(
  //         "Error checking or creating returned-user subcollection:",
  //         error
  //       );
  //       throw new Error("Unable to process the request");
  //     }
  //   },
  // });
  .query("isReturningUser", {
    async resolve({ ctx }) {
      const userId = ctx.session?.user.id;

      if (!userId) {
        throw new Error("User not authenticated");
      }

      const currentYear = new Date().getFullYear().toString();
      const currentMonth = new Date()
        .toLocaleString("default", { month: "long" })
        .toLowerCase(); // e.g., 'july'

      const userRef = ctx.firestore.collection("users").doc(userId);

      try {
        const returnedUserRef = userRef
          .collection("returning-user")
          .doc(currentYear);

        const doc = await returnedUserRef.get();

        if (!doc.exists) {
          await returnedUserRef.set({
            [currentMonth]: true,
          });
        } else {
          await returnedUserRef.update({
            [currentMonth]: true,
          });
        }
      } catch (error) {
        console.error(
          "Error checking or creating returned-user subcollection:",
          error
        );
        throw new Error("Unable to process the request");
      }
    },
  });
