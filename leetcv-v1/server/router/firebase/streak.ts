import { TRPCError } from "@trpc/server";
import { createFirestoreRouter } from "../custom/createFirestoreRouter";
import { z } from "zod";

export const streakRouter = createFirestoreRouter()
  .query("getStreak", {
    input: z.object({
      userId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userId = input.userId;
      const resumeRef = ctx.firestore
        .collection("users")
        .doc(userId)
        .collection("streak-list")
        .get();

      const streakSnapShot = (await resumeRef).docs.map((doc) => {
        return doc.data().streak;
      });

      if (streakSnapShot[0] === undefined) {
        return [];
      }

      return streakSnapShot[0];
    },
  })

  .mutation("createStreak", {
    input: z.object({
      id: z.string(),
      currentDate: z.date(),
    }),
    async resolve({ ctx, input }) {
      if (ctx.session?.user.id !== input.id) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User not found",
        });
      }

      const userRef = ctx.firestore
        .collection("users")
        .doc(input.id)
        .collection("streak-list")
        .doc(input.id);

      await ctx.firestore.runTransaction(async (transaction) => {
        const userDoc = await transaction.get(userRef);
        const streakArray = userDoc.data()?.streak || [];

        const currentDate = new Date();
        const minDate = new Date(currentDate);
        minDate.setDate(minDate.getDate() - 1);

        if (input.currentDate >= minDate) {
          const formattedCurrentDate = input.currentDate
            .toISOString()
            .split("T")[0];

          if (!streakArray.includes(formattedCurrentDate)) {
            if (!userDoc.exists) {
              transaction.set(userRef, { streak: [] });
            }

            streakArray.push(formattedCurrentDate);

            transaction.update(userRef, { streak: streakArray });
          }
        }
      });
    },
  })

  .mutation("setStreakPoints", {
    input: z.object({
      id: z.string(),
      points: z.number(),
    }),
    async resolve({ ctx, input }) {
      if (ctx.session?.user.id !== input.id) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User not found",
        });
      }

      const userRef = ctx.firestore.collection("users").doc(input.id);
      const streakPointsRef = userRef.collection("streak-points").doc(input.id);
      const doc = await streakPointsRef.get();

      let currentPoints = 0;
      if (doc.exists) {
        currentPoints = doc.data()?.points;
      }

      const newPoints = currentPoints + input.points;

      await streakPointsRef.set({
        points: newPoints,
      });

      return {
        points: newPoints,
      };
    },
  })

  .query("getStreakPoints", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      if (ctx.session?.user.id !== input.id) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User not found",
        });
      }

      const userRef = ctx.firestore.collection("users").doc(input.id);
      const streakPointsRef = userRef.collection("streak-points").doc(input.id);
      const doc = await streakPointsRef.get();

      let currentPoints = 0;
      if (doc.exists && doc.data()?.points) {
        currentPoints = doc.data()?.points;
      }

      return {
        points: currentPoints,
      };
    },
  });
