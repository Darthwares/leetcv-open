import { z } from "zod";

export const socialMediaSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  socialMediaUrl: z.string().optional(),
});
