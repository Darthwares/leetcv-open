import { z } from "zod";

export const languageSchema = z.object({
  id: z.string(),
  name: z.string(),
  read: z.boolean().optional(),
  write: z.boolean().optional(),
  speak: z.boolean().optional(),
});
