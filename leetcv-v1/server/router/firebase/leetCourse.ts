import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createPublicFirestoreRouter } from "../custom/createPublicFirebaseRouter";
import admin from "../firebaseAdmin";

export const leetCourseRouter = createPublicFirestoreRouter()
  .mutation("updateLeetCourseLive", {
    input: z.object({
      id: z.string(),
      live: z.number(),
    }),
    async resolve({ ctx, input }) {
      await ctx.firestore
        .collection("users")
        .doc(input.id)
        .collection("current-leet-course")
        .doc(input.id)
        .set(
          {
            live: input.live,
          },
          { merge: true }
        );
    },
  })
  .mutation("updateLeetCourseGems", {
    input: z.object({
      id: z.string(),
      gems: z.number(),
    }),
    async resolve({ ctx, input }) {
      if (ctx.session?.user.id !== input.id) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User can only update their own information",
        });
      }
      await ctx.firestore
        .collection("users")
        .doc(input.id)
        .collection("current-leet-course")
        .doc(input.id)
        .set(
          {
            gems: input.gems,
          },
          { merge: true }
        );
    },
  })
  .mutation("updateFreeHeartFilled", {
    input: z.object({
      id: z.string(),
      isFilled: z.boolean(),
    }),
    async resolve({ ctx, input }) {
      if (ctx.session?.user.id !== input.id) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User can only update their own information",
        });
      }
      await ctx.firestore
        .collection("users")
        .doc(input.id)
        .collection("current-leet-course")
        .doc(input.id)
        .set(
          {
            isFreeHeartFilled: input.isFilled,
          },
          { merge: true }
        );
    },
  })
  .mutation("updateStreak", {
    input: z.object({
      userId: z.string(),
      date: z.string(), // Date when the quiz was completed
    }),
    async resolve({ ctx, input }) {
      const { userId, date } = input;
      const today = new Date(date);
      const startOfWeek = new Date(
        today.setDate(today.getDate() - today.getDay())
      ); // Calculate the week's start

      // Reference to the user's streak document
      const streakRef = ctx.firestore
        .collection("users")
        .doc(userId)
        .collection("current-leet-course")
        .doc(userId);

      const streakDoc = await streakRef.get();
      const streakData = streakDoc.exists
        ? streakDoc.data()
        : { days: [], startOfWeek: null };

      // Check if the streak needs to be reset
      if (
        !streakData?.startOfWeek ||
        new Date(streakData.startOfWeek).getTime() < startOfWeek.getTime()
      ) {
        // Reset streak with merge: true
        await streakRef.set(
          {
            days: [date], // Start new streak with today
            startOfWeek: startOfWeek.toISOString(), // New week's start date
          },
          { merge: true }
        );
      } else {
        // Update streak by adding the date if not already present
        if (!streakData.days.includes(date)) {
          await streakRef.set(
            {
              days: [...streakData.days, date], // Append today's date to streak
            },
            { merge: true }
          );
        }
      }
    },
  })
  .query("getLeetCourseLives", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      const courseRef = ctx.firestore
        .collection("users")
        .doc(input.id)
        .collection("current-leet-course")
        .doc(input.id);

      const courseDoc = await courseRef.get();

      if (!courseDoc.exists) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "LeetCourse record not found",
        });
      }

      const data = courseDoc.data();
      const currentLive = data?.live ?? 0;
      const lastUpdated = data?.lastUpdated?.toDate() ?? new Date(0);
      const nextHeartInHours = data?.nextHeartInHours ?? null;

      return {
        live: currentLive,
        nextHeartIn: nextHeartInHours, // Return in hours directly
      };
    },
  })
  .query("getLeetCourseGems", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      const courseRef = ctx.firestore
        .collection("users")
        .doc(input.id)
        .collection("current-leet-course")
        .doc(input.id);

      const courseDoc = await courseRef.get();

      if (!courseDoc.exists) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "LeetCourse record not found",
        });
      }

      const data = courseDoc.data();
      const gems = data?.gems ?? 0;

      return {
        gems,
      };
    },
  })
  .query("getFreeHeartFilled", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      const courseRef = ctx.firestore
        .collection("users")
        .doc(input.id)
        .collection("current-leet-course")
        .doc(input.id);

      const courseDoc = await courseRef.get();

      if (!courseDoc.exists) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "LeetCourse record not found",
        });
      }

      const data = courseDoc.data();
      const isAlreadyFilled = data?.isFreeHeartFilled ?? false;

      return {
        isAlreadyFilled,
      };
    },
  })
  .query("getStreak", {
    input: z.object({
      userId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const { userId } = input;

      const streakRef = ctx.firestore
        .collection("users")
        .doc(userId)
        .collection("current-leet-course")
        .doc(userId);

      const streakDoc = await streakRef.get();

      if (!streakDoc.exists) {
        console.log("No streak document found for user:", userId);
        return { days: [], startOfWeek: null };
      }

      const data = streakDoc.data();

      const today = new Date();

      const currentStartOfWeek = new Date(
        Date.UTC(
          today.getUTCFullYear(),
          today.getUTCMonth(),
          today.getUTCDate() - today.getUTCDay()
        )
      );

      const storedStartOfWeek = data?.startOfWeek
        ? new Date(data.startOfWeek)
        : null;

      if (
        !storedStartOfWeek ||
        storedStartOfWeek.getTime() < currentStartOfWeek.getTime()
      ) {
        console.log("Resetting week data for user:", userId);
        return { days: [], startOfWeek: currentStartOfWeek.toISOString() };
      }

      return {
        days: data?.days ?? [],
      };
    },
  })
  .query("getUserRegisteredAt", {
    async resolve({ ctx }) {
      const userId = ctx.session?.user.id!;

      const userRef = ctx.firestore.collection("users").doc(userId).get();

      const userDoc = (await userRef).data();

      const timestamp = userDoc?.registeredAt;
      const date = timestamp ? new Date(timestamp._seconds * 1000) : new Date();
      const formattedDate = date.toLocaleString("en-US", {
        month: "long",
        year: "numeric",
      });

      return formattedDate;
    },
  })
  .mutation("updateChestOpened", {
    input: z.object({
      unitName: z.string(),
      currentLesson: z.string(),
      courseName: z.string(),
      difficulty: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session?.user.id!;

      const lessonRef = ctx.firestore
        .collection("users")
        .doc(userId)
        .collection("leet-course")
        .doc(input.courseName)
        .collection(input.difficulty)
        .doc(input.unitName)
        .collection("lessons")
        .doc(input.currentLesson);

      const lessonDoc = await lessonRef.get();
      if (!lessonDoc.exists) {
        throw new Error("Lesson document not found");
      }

      const lessonData = lessonDoc.data();
      if (lessonData?.chestOpened) {
        throw new Error("Chest has already been opened");
      }

      const gemsRef = ctx.firestore
        .collection("users")
        .doc(userId)
        .collection("current-leet-course")
        .doc(userId);

      const gemsDoc = await gemsRef.get();
      const currentGems = gemsDoc.exists ? gemsDoc.data()?.gems || 0 : 0;

      await gemsRef.set(
        {
          gems: currentGems + 5,
        },
        { merge: true }
      );

      await lessonRef.update({
        chestOpened: true,
      });

      return true;
    },
  })
  .mutation("setCourseLives", {
    input: z.object({
      id: z.string(),
      plan: z.string(), // Plan is required: Free, Premium, or Pro
    }),
    async resolve({ ctx, input }) {
      const courseRef = ctx.firestore
        .collection("users")
        .doc(input.id)
        .collection("current-leet-course")
        .doc(input.id);

      const courseDoc = await courseRef.get();

      const now = new Date();

      // Determine max lives based on the plan
      const maxHearts =
        input.plan === "Premium" ? 50 : input.plan === "Pro" ? 99999 : 5;

      let updatedLive = maxHearts; // Initial value is the max lives
      let nextHeartInHours = null;

      // If the document already exists, calculate updates
      if (courseDoc.exists) {
        const data = courseDoc.data();
        const currentLive = data?.live ?? 0;
        const lastUpdated = data?.lastUpdated?.toDate() ?? new Date(0);

        // 1. Daily Reset to Max Hearts
        const timeSinceMidnight =
          now.getHours() * 60 * 60 * 1000 +
          now.getMinutes() * 60 * 1000 +
          now.getSeconds() * 1000;
        const midnight = new Date(now.getTime() - timeSinceMidnight);

        if (lastUpdated < midnight) {
          updatedLive = maxHearts; // Reset to max daily hearts
        } else if (currentLive === 0) {
          // 2. Four-Hour Increment Only When Hearts Are 0
          const timeElapsed =
            (now.getTime() - lastUpdated.getTime()) / (1000 * 60 * 60); // Time elapsed in hours

          if (timeElapsed >= 4) {
            const heartsToAdd = Math.floor(timeElapsed / 4); // Add one heart every 4 hours
            updatedLive = Math.min(currentLive + heartsToAdd, maxHearts); // Ensure it doesn't exceed max
          }

          // Calculate nextHeartInHours
          nextHeartInHours = Math.max(4 - (timeElapsed % 4), 0);
        }
      }

      // Set the document in Firestore (create if not exists)
      await courseRef.set(
        {
          live: updatedLive,
          lastUpdated: admin.firestore.Timestamp.fromDate(now),
          nextHeartInHours: nextHeartInHours !== null ? nextHeartInHours : null,
        },
        { merge: true } // Ensures fields are merged with existing data
      );
    },
  });
