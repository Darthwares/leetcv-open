import { z } from "zod";
import { courseSchema } from "data/schemas/course.schema";

export type Course = z.infer<typeof courseSchema>;
