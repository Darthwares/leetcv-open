import { z } from "zod";

export const userTokenSchema = z.object({
  id: z.string(),
  name: z.string(),
  tokenList: z.array(z.string()),
  token: z.array(z.string()),
});
