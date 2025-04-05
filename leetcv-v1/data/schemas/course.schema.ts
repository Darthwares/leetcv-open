import { z } from "zod";

export const courseSchema = z.object({
  id: z.string(),
  name: z.string(),
  start: z.string(),
  end: z.string(),
  coursePlatform: z.string(),
  courseId: z.string(),
  certificateLink: z.string()
});
