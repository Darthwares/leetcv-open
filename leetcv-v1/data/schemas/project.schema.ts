import { z } from "zod";

export const projectSchema = z.object({
  id: z.string(),
  name: z.string(),
  skills: z.array(z.string()),
  company: z.string(),
  title: z.string(),
  start: z.string(),
  end: z.string(),
  checked: z.boolean().optional(),
  impact: z.string().optional(),
  work: z.string(),
  url: z.string().optional(),
  uploadedImages: z.array(z.string()).optional(),
  selectedImages: z.array(z.string()).optional(),
});
