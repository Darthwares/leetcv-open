import { z } from "zod";
import { reviewCategoryEnum } from "./review.schema";

export const requestListSchema = z.object({
  id: z.string(),
  status: z.enum(["Pending", "Approved", "Denied", "Resolved"]),
  name: z.string(),
  image: z.string(),
  passCode: z.number().optional(),
  email: z.string().email(),
  handle: z.string(),
  userId: z.string(),
  requestId: z.string(),
  content: z.string(),
  username: z.string(),
  reviewTitle: z.string(),
  reviewCategory: reviewCategoryEnum,
  requesterHandle: z.string(),
  createdAt: z.any(),
  requesterPosition: z.string(),
});
