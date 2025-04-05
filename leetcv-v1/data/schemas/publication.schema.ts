import { z } from "zod";

export const publicationSchema = z.object({
  id: z.string(),
  title: z.string(),
  publisher: z.string(),
  publicationDate: z.string(),
  publicationURL: z.string(),
  description: z.string(),
});
