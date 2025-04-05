import { z } from "zod";
import admin from "../firebaseAdmin";
import { createFirestoreRouter } from "../custom/createFirestoreRouter";
import { TRPCError } from "@trpc/server";
import { Interview } from "types/dashboardTypes";

export const mockInterviewRouter = createFirestoreRouter()
  .mutation("saveInterviewData", {
    input: z.object({
      id: z.string(),
      topic: z.string(),
      timeTaken: z.string(),
      totalQuestions: z.number(),
      answeredQuestions: z.number(),
      unansweredQuestions: z.number(),
      questionAnswer: z.array(
        z.object({
          question: z.string(),
          answer: z.string(),
        })
      ),
      report: z.array(
        z.object({
          question: z.string(),
          answer: z.string(),
          idealAnswer: z.string(),
          areasForImprovement: z.string(),
          score: z.number(),
          gptResponseContent: z.string(),
        })
      ),
      attemptedAtTime: z.string(),
    }),
    async resolve({ ctx, input }) {
      if (ctx.session?.user.id !== input.id) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User can only update their own information",
        });
      }
      const userRef = ctx.firestore.collection("users").doc(input.id);

      const topicDateTime = `${input.topic}_${
        new Date().toISOString().split("T")[0]
      }_${new Date()
        .toLocaleTimeString("en-GB", { hour12: false })
        .replace(/:/g, "-")}`;

      const currentDate = new Date();
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "short",
        day: "numeric",
      };
      const formattedDate = currentDate.toLocaleDateString("en-US", options);
      await userRef.collection("mockinterview").doc(topicDateTime).set({
        topic: input.topic,
        timeTaken: input.timeTaken,
        totalQuestions: input.totalQuestions,
        answeredQuestions: input.answeredQuestions,
        unansweredQuestions: input.unansweredQuestions,
        questionAnswer: input.questionAnswer,
        report: input.report,
        attemptedAtDate: formattedDate,
        attemptedAtTime: input.attemptedAtTime,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    },
  })
  .query("getAllMockInterviews", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      if (ctx.session?.user.id !== input.id) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User can only access their own information",
        });
      }

      const userRef = ctx.firestore.collection("users").doc(input.id);
      const mockInterviewRef = userRef.collection("mockinterview");

      try {
        const snapshot = await mockInterviewRef
          .orderBy("createdAt", "desc")
          .get();

        if (snapshot.empty) {
          return [];
        }

        const interviews = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            timeTaken: data.timeTaken,
            totalQuestions: data.totalQuestions,
            answeredQuestions: data.answeredQuestions,
            unansweredQuestions: data.unansweredQuestions,
            attemptedAtDate: data.attemptedAtDate,
            questionAnswer: data.questionAnswer,
            report: data.report,
            topic: data.topic,
            attemptedAtTime: data.attemptedAtTime,
            createdAt: data.createdAt,
          } as Interview;
        });

        return interviews;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to retrieve mock interview data",
        });
      }
    },
  })
  .query("getQuestionsByTopic", {
    input: z.object({
      id: z.string(),
      topic: z.string(),
    }),
    async resolve({ ctx, input }) {
      if (ctx.session?.user.id !== input.id) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User can only access their own information",
        });
      }

      const userRef = ctx.firestore.collection("users").doc(input.id);
      const mockInterviewRef = userRef.collection("mockinterview");

      try {
        const snapshot = await mockInterviewRef
          .where("topic", "==", input.topic)
          .get();

       
        const allQuestions: string[] = [];
        snapshot.forEach((doc) => {
          const interviewData = doc.data();
          if (interviewData.questionAnswer) {
            interviewData.questionAnswer.forEach((qa: { question: string }) => {
              allQuestions.push(qa.question);
            });
          }
        });

        return allQuestions;
      } catch (error) {
        console.error("Error fetching mock interview data:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to retrieve mock interview data",
        });
      }
    },
  });

