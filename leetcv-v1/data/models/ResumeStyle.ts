import {
  fontStyleSchema,
  resumeStylesSchema,
} from "data/schemas/resumeStyle.schema";
import { z } from "zod";

export type FontStyleProps = z.infer<typeof fontStyleSchema>;
export type ResumeStyle = z.infer<typeof resumeStylesSchema>;
