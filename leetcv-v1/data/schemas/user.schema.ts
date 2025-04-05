import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  image: z.string(),
  name: z.string(),
  provider: z.string(),
  version: z.string(),
  handle: z.string(),
});

export const userNameSchema = z.object({
  displayName: z.string(),
});
