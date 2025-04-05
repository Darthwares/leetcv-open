import { z } from "zod";
import { createFirestoreRouter } from "../custom/createFirestoreRouter";
import admin from "../firebaseAdmin";
import { TRPCError } from "@trpc/server";

export const feedbackRouter = createFirestoreRouter()
  .mutation("create", {
    input: z.object({
      id: z.string(),
      message: z.string(),
    }),
    async resolve({ ctx, input }) {
      if (ctx.session?.user.id !== input.id) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User can only look up their own information",
        });
      }
      ctx.firestore.collection("feedbacks").doc(input.id).set({
        message: input.message,
        messagedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    },
  })
  .mutation("setConversion", {
    input: z.object({
      id: z.string(),
      status: z.boolean(),
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
        .collection("resume-converted")
        .doc(input.id)
        .set({
          status: input.status,
        });
    },
  })
  .query("getConversion", {
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
      const convertRef = ctx.firestore
        .collection("users")
        .doc(input.id)
        .collection("resume-converted")
        .doc(input.id);
      const convertedSnapShot = await convertRef.get();
      return convertedSnapShot.data()?.status as boolean;
    },
  })
  .mutation("saveFeedback", {
    input: z.object({
      id: z.string(),
      message: z.string(),
      name: z.string(),
      rating: z.number(),
      email: z.string(),
      type: z.string(),
      screenshotUrls: z.array(z.string()).optional(),
      page: z.string(),
    }),
    async resolve({ ctx, input }) {
      const feedbackDocRef = ctx.firestore
        .collection("user-feedbacks")
        .doc(input.id);
      await feedbackDocRef.set(
        {
          feedbacks: {
            rating: input.rating,
            id: input.id,
            email: input.email,
            name: input.name,
            messages: admin.firestore.FieldValue.arrayUnion({
              message: input.message,
              type: input.type,
              messagedAt: Date.now(),
              screenshotUrls: input.screenshotUrls,
              page: input.page,
            }),
          },
        },
        { merge: true }
      );
    },
  });
