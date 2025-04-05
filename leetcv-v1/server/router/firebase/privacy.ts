import { TRPCError } from "@trpc/server";
import { createFirestoreRouter } from "../custom/createFirestoreRouter";
import { z } from "zod";

export const privacyRouter = createFirestoreRouter()
  .mutation("update", {
    input: z.object({
      id: z.string(),
      private: z.boolean(),
    }),
    async resolve({ ctx, input }) {
      if (ctx.session?.user.id !== input.id) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User can only update their own privacy setting",
        });
      }
      
      const resumeRef = ctx.firestore.collection("resumes").doc(input.id);
      const resumeRecord = await resumeRef.get();
      if (!resumeRecord.exists) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Resume not found",
        });
      }

      resumeRef.set(
        {
          private: input.private,
        },
        { merge: true }
      );
    },
  })

  .query("get", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      if (ctx.session?.user.id !== input.id) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User can only look up their own privacy setting",
        });
      }

      const resumeRef = ctx.firestore.collection("resumes").doc(input.id);
      const resumeRecord = await resumeRef.get();
      if (!resumeRecord.exists) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Resume not found",
        });
      }
      return resumeRecord.data();
    },
  });
