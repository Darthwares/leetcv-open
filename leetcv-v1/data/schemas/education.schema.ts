import { z } from "zod";

export const educationSchema = z.object({
  id: z.string(),
  start: z.string(),
  end: z.string(),
  major: z.string(),
  name: z.string(),
  degree: z.string(),
  grade: z.string(),
})