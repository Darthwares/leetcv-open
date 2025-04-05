import { z } from "zod";
import { createFirestoreRouter } from "../custom/createFirestoreRouter";
import admin from "../firebaseAdmin";

export const coverLetterRouter = createFirestoreRouter()
  .query("getLetters", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      const handleRef = ctx.firestore
        .collection("users")
        .doc(input.id)
        .collection("coverLetter");
      const letterRef = await handleRef.get();
      const letterSnapShot = await Promise.all(
        letterRef.docs.map(async (doc) => await doc.data())
      );
      return letterSnapShot;
    },
  })
  .mutation("create", {
    input: z.object({
      id: z.string(),
      coverLetter: z.string(),
      coverLetterId: z.string(),
      jobPosition: z.string(),
      image: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userRef = ctx.firestore.collection("users").doc(input.id);

      await userRef.collection("coverLetter").doc(input.coverLetterId).set({
        id: input.coverLetterId,
        coverLetter: input.coverLetter,
        jobPosition: input.jobPosition,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        image: input.image,
      });
    },
  })
  .mutation("delete", {
    input: z.object({
      id: z.string(),
      coverLetterId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userRef = ctx.firestore.collection("users").doc(input.id);
      const coverLetterRef = userRef
        .collection("coverLetter")
        .doc(input.coverLetterId);

      const coverLetterDoc = await coverLetterRef.get();
      if (!coverLetterDoc.exists) {
        throw new Error("Cover letter not found.");
      }

      await coverLetterRef.delete();
    },
  })
  .mutation("update", {
    input: z.object({
      id: z.string(),
      coverLetterId: z.string(),
      coverLetter: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userRef = ctx.firestore.collection("users").doc(input.id);
      const coverLetterRef = userRef
        .collection("coverLetter")
        .doc(input.coverLetterId);

      const coverLetterDoc = await coverLetterRef.get();
      if (!coverLetterDoc.exists) {
        throw new Error("Cover letter not found.");
      }

      await coverLetterRef.update({
        coverLetter: input.coverLetter,
      });
    },
  });
