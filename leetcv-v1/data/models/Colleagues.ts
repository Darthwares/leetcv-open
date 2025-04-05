import { z } from "zod";
import { UserProfile, UserSchema } from "data/schemas/colleagues.schema";

export type Colleagues = z.infer<typeof UserSchema>;
export type UserProfile = z.infer<typeof UserProfile>;
