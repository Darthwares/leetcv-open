import { z } from "zod";

export const patentSchema = z.object({
  id: z.string(),
  title: z.string(),
  patentNumber: z.string(),
  patentDescription: z.string().optional(),
  patentIssueDate: z.string().optional(),
  patentMembers: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        url: z.string().optional(),
      })
    )
    .optional(),
  isPatentIssued: z.boolean().optional(),
  patentURL: z.string().optional(),
});
