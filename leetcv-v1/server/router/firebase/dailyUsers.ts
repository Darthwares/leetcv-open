import { z } from "zod";
import { getFormattedDateTime } from "@constants/defaults";
import { createFirestoreRouter } from "../custom/createFirestoreRouter";

export const dailyUserRouter = createFirestoreRouter()
  .mutation("incrementVisit", {
    input: z.object({
      userId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const { currentDate, monthName, year, formattedDate, formattedTime } =
        getFormattedDateTime();

      const docName = `${monthName}-${year}`;

      const userRef = ctx.firestore.collection("users").doc(input.userId);
      const monthlyStatsRef = userRef.collection("monthly-stats").doc(docName);

      // Use a transaction to ensure data consistency
      await ctx.firestore.runTransaction(async (transaction) => {
        const userVisitDoc = await transaction.get(monthlyStatsRef);

        if (!userVisitDoc.exists) {
          console.log(
            `User ${input.userId} is visiting for the first time in ${monthName}.`
          );

          const defaultData = {
            month: monthName,
            year: year,
            lastVisited: formattedDate + " " + formattedTime,
            visitedDates: [currentDate],
          };
          transaction.set(monthlyStatsRef, defaultData);
        } else {
          const previousData = userVisitDoc.data();
          const updatedVisitedDates = previousData?.visitedDates || [];

          if (!updatedVisitedDates.includes(currentDate)) {
            updatedVisitedDates.push(currentDate);
            transaction.update(monthlyStatsRef, {
              lastVisited: formattedDate + " " + formattedTime,
              visitedDates: updatedVisitedDates,
            });
          }
        }
      });
    },
  })
  .query("getDailyStats", {
    input: z.object({
      userId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const { year, monthName } = getFormattedDateTime();
      const { userId } = input;
      const docName = `${monthName}-${year}`;

      const dailyStatsRef = ctx.firestore
        .collection("users")
        .doc(userId)
        .collection("monthly-stats")
        .doc(docName);

      const statsDoc = await dailyStatsRef.get();

      if (!statsDoc.exists) {
        return {
          message: `No data found for the user ${userId} in ${monthName}, ${year}.`,
        };
      }

      const visitData = statsDoc.data();

      return {
        month: visitData?.month,
        year: visitData?.year,
        lastUpdated: visitData?.lastVisited,
        visitedDates: visitData?.visitedDates || [],
      };
    },
  });
