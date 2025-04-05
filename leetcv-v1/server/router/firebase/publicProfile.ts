import { z } from "zod";
import { createPublicFirestoreRouter } from "../custom/createPublicFirebaseRouter";
import { PublicResume } from "data/models/Public";
import { Handle } from "data/models/Handle";
import { Resume } from "data/models/UserInfo";
import { ResumesProps, sanitizeResume } from "@constants/defaults";

export const publicRouter = createPublicFirestoreRouter()
  .query("getProfile", {
    input: z.object({
      handle: z.string(),
    }),
    async resolve({ ctx, input }) {
      const handleRef = ctx.firestore.collection("usernames").doc(input.handle);
      const handleRecord = await handleRef.get();

      const handleName = handleRecord.data() as Handle;

      const resumeRef = ctx.firestore
        .collection("resumes")
        .doc(handleName.userId);
      const resumeRecord = await resumeRef.get();
      const resume = resumeRecord.data() as PublicResume;
      const publicResume: PublicResume = {
        handle: resume.handle,
        id: resume.id,
        private: resume.private,
        image: resume.image,
        displayName: resume.displayName,
        description: resume.description,
        address: resume.address,
        currentCompany: resume.currentCompany,
        position: resume.position,
        remoteWork: resume.remoteWork,
        skills: resume.skills,
      };
      console.log(resume.handle, resume.address, "public resume");
      return publicResume;
    },
  })
  .query("getResumeWithoutPasscode", {
    input: z.object({
      handle: z.string(),
    }),
    async resolve({ ctx, input }) {
      const handleNameRef = ctx.firestore
        .collection("usernames")
        .doc(input.handle);
      const handleNameRecord = await handleNameRef.get();
      const handle = handleNameRecord.data() as Handle;
      const resumeRef = ctx.firestore.collection("resumes").doc(handle.userId);
      const resumeRecord = await resumeRef.get();
      const resume = resumeRecord.data() as Resume;
      sanitizeResume(resume);
      return resume;
    },
  })
  .query("getLeetLinkCount", {
    input: z.object({
      id: z.string(),
      handle: z.string(),
      file: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userName = ctx.firestore.collection("usernames").doc(input.handle);
      const recordRef = await userName.get();
      const handleTarget = recordRef.data() as Handle;
      const resumeRef = ctx.firestore
        .collection("users")
        .doc(handleTarget?.userId)
        .collection(input.file);
      const docRef = ctx.firestore
        .collection("users")
        .doc(handleTarget?.userId);
      return docRef.listCollections().then(async (collections) => {
        const subCollectionIds = collections.map((col) => col.id);
        if (subCollectionIds.includes(input.file)) {
          const snapshot = await resumeRef.get();
          return snapshot.docs[0].data().pageViews;
        }
        return ctx.firestore
          .collection("users")
          .doc(handleTarget.userId)
          .collection(input.file)
          .doc(handleTarget.userId)
          .set({
            pageViews: 0,
          });
      });
    },
  })

  .mutation("setLeetLinkCount", {
    input: z.object({
      handle: z.string(),
      count: z.number().optional(),
      file: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userNameRef = ctx.firestore
        .collection("usernames")
        .doc(input.handle);
      const userNameRecordRef = await userNameRef.get();

      const userHandleTarget = userNameRecordRef.data() as Handle;

      ctx.firestore
        .collection("users")
        .doc(userHandleTarget.userId)
        .collection(input.file)
        .doc(userHandleTarget.userId)
        .set({
          pageViews: input.count,
        });
    },
  })
  .query("getPublicResume", {
    input: z.object({
      handle: z.string(),
      passcode: z.number(),
    }),
    async resolve({ ctx, input }) {
      const handleRef = ctx.firestore.collection("usernames").doc(input.handle);
      const handleRecord = await handleRef.get();

      const targetHandle = handleRecord.data() as Handle;

      const resumeRef = ctx.firestore
        .collection("resumes")
        .doc(targetHandle.userId);
      const userRef = ctx.firestore
        .collection("users")
        .doc(targetHandle.userId)
        .collection("permanentLink");

      const usersRecord = await userRef.get();
      const passCode = usersRecord.docs[0].data().passCode;
      const resumeRecord = await resumeRef.get();
      const resume = resumeRecord.data() as Resume;

      if (passCode !== input.passcode) {
        return;
      }

      return resume;
    },
  })
  .query("getResumeCount", {
    async resolve({ ctx }) {
      const resumeRef = ctx.firestore.collection("resumes");
      const snapshot = await resumeRef.count().get();
      return snapshot.data().count;
    },
  })
  .query("getResume", {
    async resolve({ ctx }) {
      const resumeRef = await ctx.firestore.collection("publicResume").get();
      return resumeRef.docs.map((doc) => doc.data() as ResumesProps);
    },
  })
  .query("getPublicResumes", {
    input: z.object({
      userIdList: z.array(z.string()),
    }),
    async resolve({ ctx, input }) {
      const resumePromises = input.userIdList.map(async (userId) => {
        const resumeRef = ctx.firestore.collection("resumes").doc(userId);
        const resumeSnapShot = await resumeRef.get();
        return resumeSnapShot.data();
      });

      const resumes = await Promise.all(resumePromises);
      return resumes as Resume[];
    },
  });
