import { Resume } from "data/models/UserInfo";
import { TRPCError } from "@trpc/server";
import { createFirestoreRouter } from "../custom/createFirestoreRouter";
import { resumeSchema } from "../../../data/schemas/resume.schema";
import { sanitizeResume } from "../utils/sanitizeResume";
import { z } from "zod";
import admin from "../firebaseAdmin";

export const resumeRouter = createFirestoreRouter()
  .query("get", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx }) {
      const id = ctx.session?.user.id!;

      if (!id) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User does not exist",
        });
      }

      const resumeRef = ctx.firestore.collection("resumes").doc(id);
      const record = await resumeRef.get();

      if (!record.exists) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "User not found" });
      }

      const resume = record.data() as Resume;
      sanitizeResume(resume);

      return resume;
    },
  })
  .mutation("update", {
    input: resumeSchema,
    async resolve({ ctx, input }) {
      if (ctx.session?.user.id !== input.id) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User can only update their own information",
        });
      }

      const resumeRef = ctx.firestore.collection("resumes").doc(input.id);
      await resumeRef.set(
        {
          ...input,
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      );
    },
  })
  .query("getPasscode", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      const resumeRef = ctx.firestore
        .collection("users")
        .doc(input.id)
        .collection("permanentLink")
        .doc(input.id);
      const record = await resumeRef.get();

      if (!record.exists) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "User not found" });
      }

      const passCode = record.data()?.passCode;
      return passCode;
    },
  })
  .query("getUser", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userRef = ctx.firestore.collection("users").doc(input.id);
      const userRecord = await userRef.get();

      const user = userRecord.data();
      return user;
    },
  });
