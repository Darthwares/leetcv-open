import { z } from "zod";
import {
  categoryReviewSchema,
  categorySchema,
} from "data/schemas/category.schema";
import { activeReviewSchema } from "data/schemas/activeReview.schema";

export type Category = z.infer<typeof categorySchema>;

export type CategoryReview = z.infer<typeof categoryReviewSchema>;
export type ActiveReview = z.infer<typeof activeReviewSchema>;
