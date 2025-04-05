import { z } from "zod";

export const causeSchema = z.object({
  name: z.string(),
});
