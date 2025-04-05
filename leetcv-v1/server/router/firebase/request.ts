import { Handle } from "data/models/Handle";
import { Prospect } from "data/models/Prospect";
import { Request } from "data/models/Request";
import { TRPCError } from "@trpc/server";
import { User } from "../../../data/models/User";
import { createFirestoreRouter } from "../custom/createFirestoreRouter";
import { z } from "zod";
import admin from "../firebaseAdmin";
import { filterAndPaginateData } from "../utils/paginationAndFilter";

export const requestRouter = createFirestoreRouter()
  .query("getAll", {
    input: z.object({
      userId: z.string(),
      page: z.number(),
      status: z.string(),
    }),
    async resolve({ ctx, input }) {
      const limit = Number(process.env.TOTAL_ITEMS_PER_PAGE);
      const page = input.page ?? 1;
      if (ctx.session?.user.id !== input.userId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User can only look up their own information",
        });
      }

      const userRef = ctx.firestore.collection("users").doc(input.userId);
      const record = await userRef.get();
      if (!record.exists) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "User not found" });
      }
      const snapshot = await userRef
        .collection("requests")
        .orderBy("requestAt", "desc")
        .get();

      const handle: Request[] = snapshot.docs.map((doc) => {
        const docData = doc.data();
        return {
          ...docData,
          id: doc.id,
        } as Request;
      });
      const result = filterAndPaginateData(handle, input, page, limit);
      return result;
    },
  })
  .mutation("setStatus", {
    input: z.object({
      userId: z.string(),
      requestId: z.string(),
      status: z.enum(["Approved", "Denied"]),
    }),
    async resolve({ ctx, input }) {
      if (ctx.session?.user.id !== input.userId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User can only look up their own information",
        });
      }

      const userRef = ctx.firestore.collection("users").doc(input.userId);
      const record = await userRef.get();
      if (!record.exists) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "User not found" });
      }

      const requestRef = userRef.collection("requests").doc(input.requestId);
      const requestRecord = await requestRef.get();
      if (!requestRecord.exists) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "requests not found",
        });
      }

      const randomPassCode = Math.floor(100000 + Math.random() * 900000);
      const passCode = input.status === "Approved" ? randomPassCode : null;

      // todo: chibicha - find a way to type safety set
      await requestRef.set(
        {
          status: input.status,
          passCode: passCode,
          requestAt: admin.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      );

      const requesterUserRef = ctx.firestore
        .collection("users")
        .doc(input.requestId);
      const requesterRecord = await requesterUserRef.get();
      if (!requesterRecord.exists) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Requester user not found",
        });
      }

      const prospectRef = requesterUserRef
        .collection("prospects")
        .doc(input.userId);
      const prospectRecord = await prospectRef.get();
      if (!prospectRecord.exists) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Prospect record not found",
        });
      }

      await prospectRef.set(
        {
          status: input.status,
          passCode: passCode,
          prospectAt: admin.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      );
    },
  })
  .mutation("create", {
    input: z.object({
      requesterId: z.string(),
      targetHandle: z.string(),
      requesterHandle: z.string(),
    }),
    async resolve({ ctx, input }) {
      const requesterRef = ctx.firestore
        .collection("users")
        .doc(input.requesterId);
      const requestUserRecord = await requesterRef.get();
      if (!requestUserRecord.exists) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "User not found" });
      }

      const targetHandleRef = ctx.firestore
        .collection("usernames")
        .doc(input.targetHandle);
      const targetHandleRecord = await targetHandleRef.get();
      if (!targetHandleRecord.exists) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "User not found" });
      }

      const targetHandle = targetHandleRecord.data() as Handle;

      const targetRef = ctx.firestore
        .collection("users")
        .doc(targetHandle.userId);
      const targetRecord = await targetRef.get();
      if (!targetRecord.exists) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "User not found" });
      }

      const resumeRef = ctx.firestore
        .collection("resumes")
        .doc(targetHandle.userId);
      const resumesRecord = await resumeRef.get();
      if (!resumesRecord.exists) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "User not found" });
      }

      const resumeProspectRef = ctx.firestore
        .collection("resumes")
        .doc(input.requesterId);
      const resumeProspectRecord = await resumeProspectRef.get();

      const userMail = requestUserRecord.data() as User;

      const newRequest: Request = {
        id: input.requesterId,
        status: "Pending",
        image: resumeProspectRecord.data()?.image,
        name: resumeProspectRecord.data()?.displayName,
        email: userMail.email,
        handle: input.targetHandle,
        requesterHandle: input.requesterHandle,
        requestAt: admin.firestore.FieldValue.serverTimestamp(),
      };

      const newProspect: Prospect = {
        id: targetHandle.userId,
        status: "Pending",
        image: resumesRecord.data()?.image!,
        name: resumesRecord.data()?.displayName,
        email: resumesRecord.data()?.email,
        handle: input.targetHandle,
        prospectAt: admin.firestore.FieldValue.serverTimestamp(),
      };

      targetRef.collection("requests").doc(input.requesterId).set(newRequest);
      targetRef.collection("unseenNotifications").doc(targetHandle.userId).set(
        {
          request: true,
        },
        { merge: true }
      );
      requesterRef
        .collection("prospects")
        .doc(targetHandle.userId)
        .set(newProspect);
    },
  })
  .query("getCount", {
    input: z.object({
      userId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userRef = ctx.firestore.collection("users").doc(input.userId);
      const record = await userRef.get();
      if (!record.exists) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "User not found" });
      }
      const snapshot = await userRef.collection("requests").count().get();
      return snapshot.data().count;
    },
  });
