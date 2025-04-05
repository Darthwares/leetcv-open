import { TRPCError } from "@trpc/server";
import { createFirestoreRouter } from "../custom/createFirestoreRouter";
import { z } from "zod";
export const openAIRouter = createFirestoreRouter().mutation("create", {
  input: z.object({
    resumeId: z.string(),
    handle: z.string(),
  }),
  async resolve({ ctx, input }) {
    const currentUserId = ctx.session?.user.id;
    const openResumeRef = ctx.firestore
      .collection("openai-resume")
      .doc(input.resumeId);
    const newResume = (await openResumeRef.get()).data();
    const resumeRef = ctx.firestore.collection("resumes").doc(currentUserId!);
    const resumeRecord = await resumeRef.get();
    if (!resumeRecord.exists) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Resume not found",
      });
    }
    const resumeQuery = ctx.firestore
      .collection("usernames")
      .where("userId", "==", currentUserId!);
    const querySnapshot = await resumeQuery.get();
    const documentIds: string[] = [];
    querySnapshot.forEach((doc) => {
      documentIds.push(doc.id);
    });
    const handle = documentIds[0];
    resumeRef.set(
      {
        ...newResume,
        id: currentUserId,
        handle,
      },
      {
        merge: true,
      }
    );
  },
});
