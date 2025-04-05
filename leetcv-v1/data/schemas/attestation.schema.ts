import { z } from "zod";
import { projectSchema } from "./project.schema";

export const attestationSchema = z.object({
  userId: z.string(),
  requesterId: z.string(),
  email: z.string().email(),
  image: z.string(),
  name: z.string(),
  status: z.enum(["Pending", "Approved", "Denied"]),
});

export const requestAttestation = z.object({
  attestedAt: z.any(),
  emailList: z.array(z.string()),
  email: z.string().email(),
  handle: z.string(),
  image: z.string(),
  name: z.string(),
  project: projectSchema,
  requesterEmail: z.string().email(),
  approvalHandle: z.string(),
  requesterId: z.string(),
  requesterImage: z.string(),
  requesterName: z.string(),
  userId: z.string(),
  id: z.string(),
  status: z.enum(["Pending", "Approved", "Denied"]),
  uid: z.string().optional(),
});
