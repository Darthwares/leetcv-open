import { z } from "zod";

export const certificateSchema = z.object({
  id: z.string(),
  name: z.string(),
  issuingOrganization: z.string().optional(),
  issueDate: z.string(),
  expirationDate: z.string().optional(),
  credentialID: z.string().optional(),
  credentialURL: z.string().optional(),
});
