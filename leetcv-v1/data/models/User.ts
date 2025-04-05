import { z } from "zod";
import { userNameSchema, userSchema } from "data/schemas/user.schema";

export type User = z.infer<typeof userSchema>;

export type Username = z.infer<typeof userNameSchema>;
