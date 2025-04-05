import { z } from "zod";

export const experienceSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  company: z.string().optional(),
  city: z.string().optional(),
  start: z.string().optional(),
  end: z.string().optional(),
  skills: z.array(z.string()).optional(),
  checked: z.boolean().optional(),
  description: z.string().optional(),
});
