import { Resume } from "data/models/UserInfo";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createFirestoreRouter } from "../custom/createFirestoreRouter";
import { Handle } from "data/models/Handle";
import { sanitizeResume } from "@constants/defaults";
import { getUserCollegeAndRole } from "@lib/helper/college/getUserCollegeAndRole";

export const profileRouter = createFirestoreRouter()
  .query("getResume", {
    input: z.object({
      handle: z.string(),
      passCode: z.number().optional(),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx?.session?.user?.id!;
      const handleRef = ctx.firestore.collection("usernames").doc(input.handle);
      const handleRecord = await handleRef.get();
      if (!handleRecord.exists) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "username not found",
        });
      }

      const handle = handleRecord.data() as Handle;

      const userRef = ctx.firestore.collection("users").doc(handle.userId);
      const record = await userRef.get();
      if (!record.exists) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "user not found",
        });
      }

      const resumeRef = ctx.firestore.collection("resumes").doc(handle.userId);
      const resumeRecord = await resumeRef.get();
      if (!resumeRecord.exists) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "resume not found",
        });
      }

      const resume = resumeRecord.data() as Resume;
      const permanentLinkRef = userRef
        .collection("permanentLink")
        .doc(handle.userId);
      const userRecord = await permanentLinkRef.get();
 
      const result = await getUserCollegeAndRole(ctx, userId, handle);
      
      if (
        input.passCode?.toString() === userRecord.data()?.passCode?.toString()
      ) {
        return resume;
      } else if (
        resume.private &&
        input.passCode === undefined &&
        !result.isVisibleResume
      ) {
        return null;
      } else if (
        input.passCode === undefined &&
        result.isVisibleResume
      ) {
        return resume;
      } else if (!resume.private && input.passCode === undefined) {
        sanitizeResume(resume);
        return resume;
      }

      if (!userRecord.exists) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "user profile not found",
        });
      }

      const approvedRequests = userRef
        .collection("requests")
        .where("passCode", "==", input.passCode);
      const approvedRequest = await approvedRequests.get();
      if (!approvedRequest.empty) {
        return resume;
      }
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "passcode invalid",
      });
    },
  })

  .query("getPassCode", {
    input: z.object({
      handle: z.string(),
      passCode: z.number().optional(),
    }),
    async resolve({ ctx, input }) {
      const handleNameRef = ctx.firestore.collection("usernames").doc(input.handle);
      const handleNameRecord = await handleNameRef.get();
      if (!handleNameRecord.exists) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "username not found",
        });
      }

      const handle = handleNameRecord.data() as Handle;

      const userCollectionRef = ctx.firestore.collection("users").doc(handle.userId);
      const record = await userCollectionRef.get();
      if (!record.exists) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "user not found",
        });
      }

      const permanentLinkRef = userCollectionRef
        .collection("permanentLink")
        .doc(handle.userId);
      const permanentLinkRecord = await permanentLinkRef.get();

      if (!permanentLinkRecord.exists) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Permanent link record not found",
        });
      }

      const approvedRequests = userCollectionRef
        .collection("requests")
        .where("passCode", "==", input.passCode);
      const approvedRequest = await approvedRequests.get();

      let userPassCodeMatched =
        input.passCode?.toString() ===
        permanentLinkRecord.data()?.passCode?.toString();

      if (input.passCode === 0) {
        return false;
      }

      if (userPassCodeMatched) {
        return true;
      }

      if (!approvedRequest.empty) {
        return true;
      }
    },
  });
