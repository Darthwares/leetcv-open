import { z } from "zod";
import {
  customLinksSchema,
  leetLinkSchema,
  socialMediaSchema,
  themeSchema,
} from "data/schemas/leetLink.schema";

export type CustomLinkState = z.infer<typeof customLinksSchema>;
export type ThemeState = z.infer<typeof themeSchema>;
export type LeetLinkState = z.infer<typeof leetLinkSchema>;
export type SocialMediaState = z.infer<typeof socialMediaSchema>;
