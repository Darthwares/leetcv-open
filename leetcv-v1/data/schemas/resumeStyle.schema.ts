import { z } from "zod";

export const fontStyleSchema = z.object({
  value: z.string(),
  name: z.string(),
  className: z.string(),
});

export const resumeStylesSchema = z.object({
  color: z.string(),
  font: fontStyleSchema,
  bannerColor: z.string(),
});
