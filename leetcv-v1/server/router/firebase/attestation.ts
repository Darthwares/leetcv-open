import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createFirestoreRouter } from "../custom/createFirestoreRouter";
import { projectSchema } from "data/schemas/project.schema";
import admin from "../firebaseAdmin";
import { RequestAttestation } from "data/models/Attestation";
import { filterAndPaginateData } from "../utils/paginationAndFilter";
import { Project } from "data/models/Project";

const inputData = {
  id: z.string(),
  name: z.string(),
  requesterEmail: z.string(),
  email: z.string(),
  emailList: z.array(z.string()),
  image: z.string(),
  requesterPosition: z.string().optional(),
  requesterFollowers: z.string().optional(),
  approvalHandel: z.string().optional(),
  status: z.string(),
  requesterId: z.string().optional(),
  uid: z.string().optional(),
  project: projectSchema,
};
export const attestationRouter = createFirestoreRouter()
  .query("getRequests", {
    input: z.object({
      id: z.string(),
      page: z.number().optional(),
      status: z.string().optional(),
    }),
    async resolve({ ctx, input }) {
      const page = input.page ?? 1;
      const limit = Number(process.env.TOTAL_ITEMS_PER_PAGE);

      const query = ctx.firestore
        .collection("users")
        .doc(input.id)
        .collection("attestationRequest")
        .orderBy("attestedAt", "desc");

      const handleRecord = await query.get();
      const handle: RequestAttestation[] = handleRecord.docs.map((doc) => {
        const docData = doc.data();
        return {
          ...docData,
          id: doc.id,
        } as RequestAttestation;
      });

      const result = filterAndPaginateData(handle, input, page, limit);
      return result;
    },
  })
  .query("getAttestedUserList", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      const attestedUserRef = ctx.firestore
        .collection("users")
        .doc(input.id)
        .collection("attestationRequest");

      const attestedUserRecord = await attestedUserRef.get();

      const attestationRequestList = attestedUserRecord.docs
        .map((doc) => doc.data())
        .filter((request) => request.status === "Approved");
      return attestationRequestList;
    },
  })
  .query("getRequestsCount", {
    input: z.object({
      userId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userRef = ctx.firestore.collection("users").doc(input.userId);
      const recordRef = await userRef.get();
      if (!recordRef.exists) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "User not found" });
      }
      const snapshotRef = await userRef
        .collection("attestationRequest")
        .count()
        .get();
      return snapshotRef.data().count;
    },
  })
  .query("getProspectsCount", {
    input: z.object({
      userId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userRef = ctx.firestore.collection("users").doc(input.userId);
      const record = await userRef.get();
      if (!record.exists) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "User not found" });
      }
      const snapshot = await userRef
        .collection("attestationProspect")
        .count()
        .get();
      return snapshot.data().count;
    },
  })
  .query("getProspect", {
    input: z.object({
      id: z.string(),
      page: z.number(),
      status: z.string(),
    }),
    async resolve({ ctx, input }) {
      const limit = Number(process.env.TOTAL_ITEMS_PER_PAGE);
      const page = input.page ?? 1;
      const handleRef = ctx.firestore
        .collection("users")
        .doc(input.id)
        .collection("attestationProspect")
        .orderBy("attestedAt", "desc");

      const handleRecord = await handleRef.get();
      const handle: RequestAttestation[] = handleRecord.docs.map((doc) => {
        const docData = doc.data();
        return {
          ...docData,
          id: doc.id,
        } as RequestAttestation;
      });
      const result = filterAndPaginateData(handle, input, page, limit);
      return result;
    },
  })
  .mutation("create", {
    input: z.object(inputData),
    async resolve({ ctx, input }) {
      const emailList = input.emailList;

      const userDocumentRef = ctx.firestore.collection("users").doc(input.id);

      for (const email of input.emailList) {
        const resumeQuery = ctx.firestore
          .collection("resumes")
          .where("email", "==", email);

        const resumeQueryResult = await resumeQuery.get();
        const resumeData = resumeQueryResult.docs.map((doc) => doc.data());

        if (resumeData.length === 0) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: `Resume not found for email: ${email}`,
          });
        }

        const handleId = resumeData[0].id;
        const { id, displayName, image, position, followers, handle } =
          resumeData[0];
        const resumeOwnerRef = ctx.firestore.collection("users").doc(handleId);
        const requesterRecord = await resumeOwnerRef.get();

        if (!requesterRecord.exists) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "User not found",
          });
        }

        const resumeDocumentRef = ctx.firestore
          .collection("resumes")
          .doc(input.id);
        const resumeDocument = await resumeDocumentRef.get();
        if (!resumeDocument.exists) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Resume not found",
          });
        }

        const attestationRequestQuery = await ctx.firestore
          .collection("users")
          .doc(input.id)
          .collection("attestationRequest")
          .where("email", "==", email)
          .get();

        let actionId = null;
        let shouldCreateNew = true;

        const attestationProspect = NewProspect(
          input,
          id,
          displayName,
          image,
          position,
          followers,
          handle,
          email,
          emailList,
          resumeDocument,
          actionId
        );

        if (!attestationRequestQuery.empty) {
          attestationRequestQuery.forEach((doc) => {
            const requestData = doc.data();

            const projectAttributesMatch =
              requestData.project.name === input.project.name &&
              requestData.project.title === input.project.title &&
              requestData.project.company === input.project.company &&
              requestData.project.start === input.project.start &&
              requestData.project.checked === input.project.checked &&
              requestData.project.work === input.project.work &&
              arraysMatch(requestData.project.skills, input.project.skills);

            if (requestData.project.id === input?.project?.id!) {
              if (requestData.status === "Approved" && projectAttributesMatch) {
                throw new TRPCError({
                  code: "BAD_REQUEST",
                  message: `Already approved this project by this user:- ${email}.`,
                });
              }
              if (
                requestData.status !== "Approved" ||
                (requestData.status === "Approved" && !projectAttributesMatch)
              ) {
                actionId = doc.id;
                shouldCreateNew = false;
              }
            }
          });
        }

        if (shouldCreateNew) {
          const newRequestId = ctx.firestore.collection("users").doc().id;
          await resumeOwnerRef
            .collection("attestationProspect")
            .doc(newRequestId)
            .set({ ...attestationProspect, id: newRequestId });
          await resumeOwnerRef
            .collection("unseenNotifications")
            .doc(handleId)
            .set(
              {
                attestation: true,
              },
              { merge: true }
            );
          await userDocumentRef
            .collection("attestationRequest")
            .doc(newRequestId)
            .set({ ...attestationProspect, id: newRequestId });
        } else if (actionId) {
          await resumeOwnerRef
            .collection("attestationProspect")
            .doc(actionId)
            .set({ ...attestationProspect, id: actionId }, { merge: true });
          await resumeOwnerRef
            .collection("unseenNotifications")
            .doc(handleId)
            .set(
              {
                attestation: true,
              },
              { merge: true }
            );
          await userDocumentRef
            .collection("attestationRequest")
            .doc(actionId)
            .set({ ...attestationProspect, id: actionId }, { merge: true });
        }
      }
    },
  })
  .mutation("update", {
    input: z.object(inputData),
    async resolve({ ctx, input }) {
      const userRef = ctx.firestore.collection("users").doc(input.requesterId!);

      for (const email of input.emailList) {
        const handleRef = ctx.firestore
          .collection("resumes")
          .where("email", "==", input.email);

        const handleRecord = await handleRef.get();
        const handleData = handleRecord.docs.map((doc) => doc.data());

        if (handleData.length === 0) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: `Resume not found for email: ${email}`,
          });
        }
        const handleId = handleData[0].id;

        const requesterRef = ctx.firestore.collection("users").doc(handleId);
        const requesterRecord = await requesterRef.get();

        if (!requesterRecord.exists) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "User not found",
          });
        }

        await requesterRef.collection("attestationProspect").doc(input.id).set(
          {
            status: input.status,
            attestedAt: admin.firestore.FieldValue.serverTimestamp(),
          },
          { merge: true }
        );

        await userRef.collection("attestationRequest").doc(input.id).set(
          {
            status: input.status,
            attestedAt: admin.firestore.FieldValue.serverTimestamp(),
          },
          { merge: true }
        );
      }
    },
  });

function NewProspect(
  input: any,
  id: string,
  displayName: string,
  image: string,
  position: string,
  followers: string | number,
  handle: string,
  email: string,
  emailList: string[],
  requesterIdRecord: any,
  deniedRequestId?: string | null
) {
  const prospectId = deniedRequestId || input.uid!;
  return {
    userId: id,
    id: prospectId,
    requesterId: input.id,
    requesterEmail: input.requesterEmail,
    requesterName: displayName,
    requesterImage: image,
    requesterPosition: position,
    requesterFollowers: followers,
    approvalHandle: handle,
    email: email,
    uid: prospectId,
    emailList,
    status: input.status,
    image: input.image,
    name: input.name,
    project: input.project,
    handle: requesterIdRecord?.data()?.handle,
    attestedAt: admin.firestore.FieldValue.serverTimestamp(),
  };
}

function arraysMatch(arr1: string[], arr2: string[]): boolean {
  if (arr1.length !== arr2.length) return false;

  const sortedArr1 = arr1.slice().sort((a, b) => a.localeCompare(b));
  const sortedArr2 = arr2.slice().sort((a, b) => a.localeCompare(b));

  for (let i = 0; i < sortedArr1.length; i++) {
    if (sortedArr1[i] !== sortedArr2[i]) return false;
  }

  return true;
}
