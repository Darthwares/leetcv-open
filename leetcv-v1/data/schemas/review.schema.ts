import { z } from "zod";

export const reviewCategoryEnum = z.enum([
  "Projects-Review",
  "Educations-Review",
  "Awards-Review",
  "Experience-Review",
  "Publication-Review",
]);

export const reviewTitleEnum = z.enum(["Projects", "Educations", "Awards"]);

export const reviewSchema = z.object({
  userId: z.string(),
  reviewCategory: reviewCategoryEnum,
  requestId: z.string(),
  username: z.string(),
  email: z.string(),
  image: z.string().optional(),
  requesterImage: z.string().optional(),
  content: z.string(),
  status: z.string(),
  id: z.string(),
  reviewTitle: z.string(),
  requesterHandle: z.string().optional(),
  createdAt: z.any(),
  requesterPosition: z.string().optional(),
  upVoteCount: z.number().optional(),
  flagCount: z.number().optional(),
});
