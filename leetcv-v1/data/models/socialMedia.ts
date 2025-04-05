import { z } from "zod";
import { socialMediaSchema } from "data/schemas/socialMedia.schema";

export type SocialMedia = z.infer<typeof socialMediaSchema>;

