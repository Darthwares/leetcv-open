import { z } from "zod";

export const prospectSchema = z.object({
  id: z.string(),
  status: z.enum(["Pending", "Approved", "Denied"]),
  name: z.string(),
  passCode: z.number().optional(),
  email: z.string().email(),
  image: z.string(),
  handle: z.string(),
  prospectAt: z.any(),
});
