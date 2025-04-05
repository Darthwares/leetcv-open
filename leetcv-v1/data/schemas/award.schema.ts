import { z } from "zod";

export const awardSchema = z.object({
  id: z.string(),
  name: z.string(),
  awardFor: z.string(),
  date: z.string(),
  description: z.string(),
})