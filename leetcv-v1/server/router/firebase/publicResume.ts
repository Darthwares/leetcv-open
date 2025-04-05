import { Resume } from "data/models/UserInfo";
import { createFirestoreRouter } from "../custom/createFirestoreRouter";
import { z } from "zod";

export const publicResumeRouter = createFirestoreRouter()
  .query("get", {
    async resolve({ ctx }) {
      const resumeRef = await ctx.firestore
        .collection("resumes")
        .where("private", "==", false)
        .get();

      return resumeRef.docs.map((doc) => doc.data() as Resume);
    },
  })

  .mutation("setResume", {
    input: z.object({
      id: z.string(),
      handle: z.string(),
    }),
    async resolve({ ctx, input }) {
      await ctx.firestore.collection("publicResume").doc(input.handle).set({
        userId: input.id,
      });
    },
  })

  .mutation("removePublicUserId", {
    input: z.object({
      handle: z.string(),
    }),
    async resolve({ ctx, input }) {
      await ctx.firestore.collection("publicResume").doc(input.handle).delete();
    },
  });
