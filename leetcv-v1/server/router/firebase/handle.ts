import { TRPCError } from "@trpc/server";
import { Handle } from "data/models/Handle";
import { z } from "zod";
import { createFirestoreRouter } from "../custom/createFirestoreRouter";
import { Prospect } from "data/models/Prospect";
import { Visitor } from "@components/visitorList";

export const handleRouter = createFirestoreRouter()
  .mutation("isExists", {
    input: z.object({
      handle: z.string(),
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      if (ctx.session?.user.id !== input.id) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User can only look up their own information",
        });
      }
      const userRef = ctx.firestore.collection("users").doc(input.id);
      const record = await userRef.get();
      if (!record.exists) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "User not found" });
      }

      const handleRef = ctx.firestore.collection("usernames").doc(input.handle);
      const handleRecord = await handleRef.get();
      return handleRecord.exists;
    },
  })
  .mutation("create", {
    input: z.object({
      handle: z.string(),
      id: z.string(),
      currentHandle: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userRef = ctx.firestore.collection("users").doc(input.id);

      if (!input.currentHandle) {
        throw new Error("currentHandle is required");
      }

      const userRecord = await userRef.get();
      if (!userRecord.exists) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User not available",
        });
      }
      const handleRef = ctx.firestore.collection("usernames").doc(input.handle);
      const handleRecord = await handleRef.get();
      if (handleRecord.exists) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Handle not available",
        });
      }
      const newHandle: Handle = {
        userId: input.id,
      };

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
          handle: input.handle,
        },
        { merge: true }
      );
      await handleRef.set(newHandle);
      try {
        return await ctx.firestore
          .collection("usernames")
          .doc(input.currentHandle)
          .delete();
      } catch (error) {
        console.error("Failed to delete username:", error);
        throw error;
      }
    },
  })
  .query("get", {
    input: z.object({
      id: z.string(),
      handle: z.string(),
    }),
    async resolve({ ctx, input }) {
      if (ctx.session?.user.id !== input.id) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User can only look up their own information",
        });
      }
      const resumeRef = ctx.firestore.collection("usernames").doc(input.handle);
      const record = await resumeRef.get();

      if (!record.exists) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "User not found" });
      }
      const user = record.data();
      return user;
    },
  })
  .query("checkUser", {
    input: z.object({
      handle: z.string(),
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      if (ctx.session?.user.id !== input.id) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User can only look up to their own information",
        });
      }

      const userRef = ctx.firestore.collection("users").doc(input.id);
      const snapshot = await userRef.collection("prospects").get();
      const snapShotList = snapshot.docs.map((doc) => doc.data());
      return snapShotList as Prospect[];
    },
  })
  .query("getProvider", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      if (ctx.session?.user.id !== input.id) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User can only look up to their own information",
        });
      }

      const userRef = ctx.firestore.collection("users").doc(input.id);
      const snapShot = (await userRef.get()).data();
      const provider = snapShot?.provider;
      return provider;
    },
  })
  .query("getVisitingHandle", {
    input: z.object({
      id: z.string(),
      visitorHandle: z.string(),
      visitorName: z.string(),
      visitorImage: z.string(),
      visitorJobTitle: z.string(),
      userHandle: z.string(),
    }),
    async resolve({ ctx, input }) {
      if (ctx.session?.user.id !== input.id) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User can only look up their own information",
        });
      }

      const handleRef = ctx.firestore
        .collection("usernames")
        .doc(input.userHandle);
      const handleRecord = await handleRef.get();

      if (!handleRecord.exists) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "User not found" });
      }

      const targetHandle = handleRecord.data() as Handle;

      if (input.id === targetHandle.userId) {
        return { message: "Self visit. No need to record." };
      }

      const userRef = ctx.firestore
        .collection("users")
        .doc(targetHandle.userId)
        .collection("profileVisitors")
        .doc(targetHandle.userId);

      try {
        const userDoc = await userRef.get();

        let profileVisitors: Array<{
          handle: string;
          visitedAt: Date;
          visitorId: string;
          visitorName: string;
          visitorImage: string;
          visitorJobTitle: string;
        }> = [];

        if (userDoc.exists) {
          const data = userDoc.data();
          if (data && Array.isArray(data.profileVisitors)) {
            profileVisitors = data.profileVisitors;
          }
        }

        const now = new Date();
        const thirtyDaysAgo = new Date(
          now.getTime() - 30 * 24 * 60 * 60 * 1000
        );

        // Filter out visitors older than 30 days
        profileVisitors = profileVisitors.filter(
          (visitor) => new Date(visitor.visitedAt) > thirtyDaysAgo
        );

        const existingVisitorIndex = profileVisitors.findIndex(
          (visitor) => visitor.visitorId === input.id
        );

        if (existingVisitorIndex !== -1) {
          profileVisitors[existingVisitorIndex].handle = input.visitorHandle;
          profileVisitors[existingVisitorIndex].visitedAt = now;
          profileVisitors[existingVisitorIndex].visitorName = input.visitorName;
          profileVisitors[existingVisitorIndex].visitorImage =
            input.visitorImage;
          profileVisitors[existingVisitorIndex].visitorJobTitle =
            input.visitorJobTitle;
        } else {
          profileVisitors.push({
            handle: input.visitorHandle,
            visitorId: input.id,
            visitedAt: now,
            visitorName: input.visitorName,
            visitorImage: input.visitorImage,
            visitorJobTitle: input.visitorJobTitle,
          });
        }

        // Sort visitors by visitedAt in descending order
        profileVisitors.sort(
          (a, b) =>
            new Date(b.visitedAt).getTime() - new Date(a.visitedAt).getTime()
        );

        await userRef.set(
          {
            profileVisitors,
          },
          { merge: true }
        );

        return { message: "Visit recorded successfully." };
      } catch (error) {
        console.error("Error recording visit:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to record visit.",
        });
      }
    },
  })
  .query("getVisitorsList", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      if (ctx.session?.user.id !== input.id) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User can only look up their own information",
        });
      }

      const userRef = ctx.firestore
        .collection("users")
        .doc(input.id)
        .collection("profileVisitors")
        .doc(input.id);

      try {
        const userDoc = await userRef.get();

        if (!userDoc.exists) {
          return {
            firstVisitor: null,
            additionalVisitors: [],
            remainingCount: 0,
            totalVisitors: 0,
            userPlan: "Free",
          };
        }

        const data = userDoc.data();
        let profileVisitors: Visitor[] = data?.profileVisitors || [];

        if (profileVisitors.length === 0) {
          return {
            firstVisitor: null,
            additionalVisitors: [],
            remainingCount: 0,
            totalVisitors: 0,
            userPlan: "Free",
          };
        }

        // Process, filter, and sort visitors
        profileVisitors = profileVisitors
          .map((visitor: any) => {
            let visitedAtDate: Date;

            if (
              visitor.visitedAt &&
              typeof visitor.visitedAt.toDate === "function"
            ) {
              visitedAtDate = visitor.visitedAt.toDate();
            } else if (typeof visitor.visitedAt === "string") {
              visitedAtDate = new Date(visitor.visitedAt);
            } else if (visitor.visitedAt instanceof Date) {
              visitedAtDate = visitor.visitedAt;
            } else {
              throw new TRPCError({
                code: "BAD_REQUEST",
                message: "Invalid `visitedAt` format.",
              });
            }

            return {
              ...visitor,
              visitedAt: visitedAtDate,
            };
          })
          .sort((a, b) => b.visitedAt.getTime() - a.visitedAt.getTime());

        // Get user's subscription plan
        const userNameDoc = await ctx.firestore
          .collection("stripePaidUsers")
          .doc(input.id)
          .get();

        const isUserFree =
          userNameDoc.data()?.subscriptionPlan === undefined ||
          (userNameDoc.data()?.subscriptionPlan === "" &&
            userNameDoc.data()?.stripeMembershipStatus === "Inactive" &&
            userNameDoc.data()?.stripeUserSubscriptionStatus ===
              "unsubscribed");

        let userPlan;

        if (userNameDoc.exists) {
          userPlan = isUserFree ? "Free" : userNameDoc.data()?.subscriptionPlan;
        } else {
          userPlan = "Free";
        }

        // Prepare the response based on the user's plan
        if (userPlan === "Premium" || userPlan === "Pro") {
          // For Premium and Pro users, return all visitors
          return {
            firstVisitor: profileVisitors[0] || null,
            additionalVisitors: profileVisitors.slice(1),
            remainingCount: 0,
            totalVisitors: profileVisitors.length,
            userPlan,
          };
        } else {
          const firstVisitor = profileVisitors[0] || null;
          const additionalVisitors = profileVisitors.slice(1, 9); // Next 8 visitors
          const remainingCount = Math.max(0, profileVisitors.length - 9); // Count of visitors beyond the first 9

          return {
            firstVisitor,
            additionalVisitors,
            remainingCount,
            totalVisitors: profileVisitors.length,
            userPlan,
          };
        }
      } catch (error) {
        console.error("Error fetching visitors list:", error);
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to retrieve visitors list.",
        });
      }
    },
  });
