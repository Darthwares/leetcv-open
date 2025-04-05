import { reviewSchema } from "data/schemas/review.schema";
import { z } from "zod";

export type ReviewSchema = z.infer<typeof reviewSchema>;
