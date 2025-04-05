import { z } from "zod";

const QuestionSchema = z.object({
  answer: z.string(),
  correctAnswer: z.string(),
  id: z.string(),
  multipleChoices: z.array(z.string()),
  questions: z.string(),
  userAnswer: z.string(),
});

const PracticeQuestionSetSchema = z.object({
  currentLesson: z.string(),
  courseDetails: z.record(z.unknown()),
  questions: z.array(QuestionSchema),
  isStarted: z.boolean(),
});

export { QuestionSchema, PracticeQuestionSetSchema };
