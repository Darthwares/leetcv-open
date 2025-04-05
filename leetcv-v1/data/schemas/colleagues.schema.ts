import { z } from "zod";

export const UserProfile = z.object({
  id: z.string(),
  image: z.string(),
  displayName: z.string(),
  position: z.string(),
  private: z.boolean(),
  handle: z.string(),
});

export const UserSchema = z.object({
  displayName: z.string(),
  handle: z.string(),
  id: z.string(),
  image: z.string(),
  lastSeen: z.object({
    _seconds: z.number(),
    _nanoseconds: z.number(),
  }),
  name: z.string(),
  position: z.string(),
  private: z.boolean(),
});
