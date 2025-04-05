import { z } from "zod";
import { reviewCategoryEnum } from "./review.schema";

export const activeReviewSchema = z.object({
  title: z.string(),
  document: reviewCategoryEnum,
  headingTitle: z.string(),
  // id: z.string().optional(),
});
