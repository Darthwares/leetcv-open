import { z } from "zod";

export const waitListSchema = z.object({
  name: z.string(),
  email: z.string(),
  company: z.string(),
  organization: z.string(),
  status: z.enum(["Pending", "Approved"]),
});

export type WaitList = z.infer<typeof waitListSchema>;
