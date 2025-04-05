import { z } from "zod";

export const requestSchema = z.object({
  id: z.string(),
  status: z.enum(["Pending", "Approved", "Denied"]),
  name: z.string(),
  image: z.string(),
  passCode: z.number().optional(),
  email: z.string().email(),
  handle: z.string(),
  requesterHandle: z.string().optional(),
  requestAt: z.any(),
});
