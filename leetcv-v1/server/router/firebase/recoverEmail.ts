import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createFirestoreRouter } from "../custom/createFirestoreRouter";
import { Handle } from "data/models/Handle";
import { Resume } from "data/models/UserInfo";

export const recoverEmailRouter = createFirestoreRouter()
  .query("getRecoverCode", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userRef = ctx.firestore.collection("users").doc(input.id);
      const userRecordRef = await userRef.get();
      if (!userRecordRef.exists) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User not found",
        });
      }
      const recoverEmailRef = userRef.collection("recoveryEmail").doc(input.id);
      const snapshot = await recoverEmailRef.get();
      if (snapshot.exists) {
        return snapshot?.data()?.recoverCode ? snapshot.data() : null;
      }
    },
  })
  .mutation("addRecoveryEmail", {
    input: z.object({
      id: z.string(),
      email: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userRef = ctx.firestore.collection("users").doc(input.id);
      const recordRef = await userRef.get();
      const { email: currentUserEmail } = ctx.session?.user ?? {};
      if (!recordRef.exists) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "user not found",
        });
      }

      if (input.email === currentUserEmail) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Recovery email cannot be the same as the current email",
        });
      }

      return userRef.collection("recoveryEmail").doc(input.id).set(
        {
          email: input.email,
        },
        { merge: true }
      );
    },
  })
  .mutation("setUserResume", {
    input: z.object({
      recoveryCode: z.string(),
      email: z.string(),
      handle: z.string(),
    }),
    async resolve({ ctx, input }) {
      const { id: currentUserId, email: currentUserEmail } =
        ctx.session?.user ?? {};

      const userSnapshot = await ctx.firestore
        .collection("users")
        .where("email", "==", input.email)
        .get();

      if (userSnapshot.empty) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid email or recovery code",
        });
      }

      const userId = userSnapshot.docs[0].id;

      const recoveryEmailRef = await ctx.firestore
        .collection("users")
        .doc(userId)
        .collection("recoveryEmail")
        .get();

      const recoveryCode = recoveryEmailRef.docs[0].data().recoverCode;
      const oldUserEmail = ctx.firestore.collection("users").doc(userId).get();

      const recoveryEmail = (await oldUserEmail).data()?.email;

      const oldResumeRef = ctx.firestore
        .collection("resumes")
        .doc(userId)
        .get();
      const oldResume = (await oldResumeRef).data();

      if (
        recoveryCode !== input.recoveryCode ||
        input.email !== recoveryEmail
      ) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid Recovery Code or Email",
        });
      }

      if (!recoveryCode || !recoveryEmail || !oldResume) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            "Invalid values for recoveryCode, recoveryEmail, or oldResume",
        });
      }

      const handleRef = ctx.firestore.collection("usernames").doc(input.handle);

      const newHandle: Handle = {
        userId: currentUserId!,
      };
      await handleRef.set(newHandle);

      ctx.firestore
        .collection("resumes")
        .doc(currentUserId!)
        .set({
          ...oldResume,
          id: currentUserId,
          handle: input.handle,
          email: currentUserEmail,
        });
    },
  })

  .query("getRecoveryProfile", {
    input: z.object({
      recoveryCode: z.string(),
      email: z.string(),
      handle: z.string(),
    }),
    async resolve({ ctx, input }) {
      const currentEmail = ctx.session?.user?.email;
      const userSnapshot = await ctx.firestore
        .collection("users")
        .where("email", "==", input.email)
        .get();

      const userId = userSnapshot.docs[0].id;

      const recoveryEmailRef = await ctx.firestore
        .collection("users")
        .doc(userId)
        .collection("recoveryEmail")
        .get();

      const recoveryMail = recoveryEmailRef.docs[0].data();

      if (currentEmail !== recoveryMail.email) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid Recovery Code or Email",
        });
      }

      const oldResumeRef = ctx.firestore
        .collection("resumes")
        .doc(userId)
        .get();
      const oldResume = (await oldResumeRef).data();

      return oldResume as Resume;
    },
  });
