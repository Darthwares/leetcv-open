import { z } from "zod";
import { languageSchema } from "data/schemas/language.schema";

export type Language = z.infer<typeof languageSchema>;
