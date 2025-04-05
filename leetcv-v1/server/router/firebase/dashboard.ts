import { z } from "zod";
import { createFirestoreRouter } from "../custom/createFirestoreRouter";
import { TRPCError } from "@trpc/server";
import { randomInt } from "crypto";
import { Resume } from "data/models/UserInfo";
import { DocumentData } from "firebase/firestore";
import admin from "../firebaseAdmin";
import { Colleagues } from "data/models/Colleagues";

export const dashboardRouter = createFirestoreRouter()
  .query("getColleagues", {
    input: z.object({
      userId: z.string(),
      page: z.number().optional(),
      isLgDevice: z.boolean().optional(),
    }),
    async resolve({ ctx, input }) {
      const page = input.page ?? 1;
      const limit = input.isLgDevice ? 15 : 16;
      if (ctx.session?.user.id !== input.userId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User can only look up their own information",
        });
      }

      const userRef = ctx.firestore.collection("resumes").doc(input.userId);
      const snapshot = await userRef.get();
      const user = snapshot.data() as Resume;

      const userEmailDomain = user.email.split("@")[1];

      const shouldUseSetting = process.env
        .NEXT_PUBLIC_COLLEGE_EMAIL_DOMAIN!.split(",")
        .some((domain) => user.email.endsWith(domain));

      if (userEmailDomain === "gmail.com" || !shouldUseSetting) {
        return {
          users: [],
          count: 0,
          totalPages: 0,
        };
      }

      if (shouldUseSetting) {
        const emailDomain = user.email.split("@")[1];

        if (emailDomain.endsWith("ac.in")) {
          isMatchingUser("ac.in");
        } else if (
          emailDomain.endsWith("edu") ||
          emailDomain.endsWith("edu.in")
        ) {
          isMatchingUser("edu");
        } else {
          isMatchingUser(userEmailDomain);
        }

        let matchingUserRef: any;

        if (emailDomain.endsWith("ac.in")) {
          matchingUserRef = await getColleagues("ac.in");
        } else if (
          emailDomain.endsWith("edu") ||
          emailDomain.endsWith("edu.in")
        ) {
          matchingUserRef = await getColleagues("edu");
        } else {
          matchingUserRef = await getColleagues(userEmailDomain);
        }

        let users: Colleagues[] = [];
        matchingUserRef.forEach((doc: any) => {
          const userData = doc.data() as Colleagues;
          if (userData.id !== input.userId) {
            users.push(userData);
          }
        });

        for (let i = users.length - 1; i > 0; i--) {
          const j = randomInt(0, i + 1);
          [users[i], users[j]] = [users[j], users[i]];
        }

        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const matchingUsers = users.slice(startIndex, endIndex);

        return {
          users: matchingUsers,
          count: users.length,
          totalPages: Math.ceil(users.length / limit),
        };
      }

      async function getColleagues(userEmailDomain: string) {
        return await ctx.firestore
          .collection("matchingDomain")
          .doc(userEmailDomain)
          .collection(userEmailDomain)
          .get();
      }

      function isMatchingUser(userDomain: string) {
        ctx.firestore
          .collection("matchingDomain")
          .doc(userDomain)
          .set({ emailDomain: userDomain });

        ctx.firestore
          .collection("matchingDomain")
          .doc(userDomain)
          .collection(userDomain)
          .doc(input.userId)
          .set({
            id: user.id,
            image: user.image,
            displayName: user.displayName,
            position: user.position,
            private: user.private,
            email: user.email,
            handle: user.handle,
            lastSeen: admin.firestore.FieldValue.serverTimestamp(),
          });
      }
    },
  })
  .query("getResumeToReview", {
    input: z.object({
      userId: z.string(),
      page: z.number().optional(),
      limit: z.number().optional(),
    }),
    async resolve({
      ctx,
      input,
    }): Promise<{ list: Resume[]; totalPages: number }> {
      const page = input.page ?? 1;
      const resumesPerPage = input.limit ?? 18;

      const currentUserDoc = await ctx.firestore
        .collection("resumes")
        .doc(input.userId)
        .get();

      if (!currentUserDoc.exists) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Current user's resume not found",
        });
      }

      const currentUserSkills = currentUserDoc.data()?.skills || [];

      const matchingResumes = new Set<string>();
      const batchSize = 10;

      for (let i = 0; i < currentUserSkills.length; i += batchSize) {
        const batchSkills = currentUserSkills.slice(i, i + batchSize);
        const batchPromises = batchSkills.map((skill: string) =>
          ctx.firestore
            .collection("resumes")
            .where("skills", "array-contains", skill)
            .where("private", "==", false)
            .limit(50)
            .get()
        );

        const batchResults = await Promise.all(batchPromises);
        batchResults.forEach((snapshot) => {
          snapshot.forEach((doc: any) => {
            if (doc.id !== input.userId) {
              matchingResumes.add(doc.id);
            }
          });
        });
      }

      const resumeIds = Array.from(matchingResumes);
      const startIndex = (page - 1) * resumesPerPage;
      const selectedResumes = resumeIds.slice(
        startIndex,
        startIndex + resumesPerPage
      );

      const detailedResumesPromises = selectedResumes.map((id) =>
        ctx.firestore.collection("resumes").doc(id).get()
      );

      const detailedResumes = await Promise.all(detailedResumesPromises);

      const resumesData: any[] = detailedResumes.map((doc) => ({
        id: doc.id,
        ...(doc.data()! as DocumentData),
      }));

      return {
        list: resumesData,
        totalPages: Math.ceil(resumeIds.length / resumesPerPage),
      };
    },
  });
