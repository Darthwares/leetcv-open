import { z } from "zod";
import {
  PracticeQuestionSetSchema,
  QuestionSchema,
} from "data/schemas/leetCourses.schema";

export type Questions = z.infer<typeof QuestionSchema>;
export type PracticeQuestions = z.infer<typeof PracticeQuestionSetSchema>;
