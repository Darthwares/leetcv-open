import { z } from "zod";
import { createFirestoreRouter } from "../custom/createFirestoreRouter";
import admin from "../firebaseAdmin";
import { TRPCError } from "@trpc/server";

export const referralSourceRouter = createFirestoreRouter()
  .mutation("create", {
    input: z.object({
      id: z.string(),
      source: z.string(),
    }),
    async resolve({ ctx, input }) {
      if (ctx.session?.user.id !== input.id) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User can only look up their own information",
        });
      }
      ctx.firestore
        .collection("users")
        .doc(input.id)
        .collection("referral-source")
        .doc(input.id)
        .set({
          source: input.source,
          sourceTimestamp: admin.firestore.FieldValue.serverTimestamp(),
        });
    },
  })
  .query("getReferralSource", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      if (ctx.session?.user.id !== input.id) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User can only look up their own information",
        });
      }

      const referralSource = ctx.firestore
        .collection("users")
        .doc(input.id)
        .collection("referral-source")
        .doc(input.id);
      const referralSourceSnapShot = await referralSource.get();
      return referralSourceSnapShot.data()?.source as string;
    },
  });
