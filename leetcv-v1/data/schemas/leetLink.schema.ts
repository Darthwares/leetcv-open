import { z } from "zod";

export const customLinksSchema = z.object({
  id: z.string(),
  urlTitle: z.string(),
  url: z.string(),
  isOpen: z.boolean(),
  isEditingTitle: z.boolean(),
  isValidUrl: z.boolean(),
  show: z.boolean(),
});

export const themeSchema = z.object({
  id: z.number(),
  cardBgColor: z.string(),
  showQrBtnBgAndTextColor: z.string(),
  handleTextColor: z.string(),
  positionBgAndTextColor: z.string(),
  bioTextColor: z.string(),
  headerTextColor: z.string(),
  buttonBgAndTextColor: z.string(),
  socialIconColor: z.string(),
});

export const socialMediaSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  socialMediaUrl: z.string().optional(),
  show: z.boolean().optional(),
});

export const leetLinkSchema = z.object({
  bio: z.string().optional(),
  header: z.string().optional(),
  customLinks: z.array(customLinksSchema).optional(),
  socialLinks: z.array(socialMediaSchema).optional(),
  theme: themeSchema.optional(),
});
