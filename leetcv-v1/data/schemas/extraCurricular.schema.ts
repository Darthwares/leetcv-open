import { z } from "zod";

export const extraCurricularSchema = z.object({
  id: z.string(),
  activityName: z.string().optional(),
  organization: z.string().optional(),
  start: z.string().optional(),
  end: z.string().optional(),
  checked: z.boolean().optional(),
  description: z.string().optional(),
});
