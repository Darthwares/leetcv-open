import { z } from "zod";
import { createFirestoreRouter } from "../custom/createFirestoreRouter";
import { TRPCError } from "@trpc/server";

export const aiReviewRouter = createFirestoreRouter()
  .mutation("create", {
    input: z.object({
      id: z.string(),
      review: z.string(),
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
        .collection("ai-review")
        .doc(input.id)
        .set({
          review: input.review,
        });
    },
  })
  .query("getAiReviews", {
    input: z.object({
      id: z.string().optional()!,
    }),
    async resolve({ ctx, input }) {
      const handleRef = ctx.firestore
        .collection("users")
        .doc(input.id!)
        .collection("ai-review")
        .doc(input.id!);
      const handleRecord = await handleRef.get();
      const review = handleRecord.data()?.review;
      return review;
    },
  });
