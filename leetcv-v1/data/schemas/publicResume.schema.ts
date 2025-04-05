import { z } from "zod";

export const remoteWork = z.enum(["Office", "Remote", "Both"]);

export const publicResumeSchema = z.object({
  id: z.string(),
  handle: z.string().min(2),
  private: z.boolean(),
  image: z.string().optional(),
  displayName: z.string().min(2),
  description: z.string().optional(),
  address: z.string().optional(),
  currentCompany: z.string().optional(),
  position: z.string().optional(),
  remoteWork: remoteWork,
  skills: z.array(z.string()).optional(),
});
