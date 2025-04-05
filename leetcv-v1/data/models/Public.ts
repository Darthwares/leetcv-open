import { z } from "zod";
import { publicResumeSchema } from "data/schemas/publicResume.schema";

export type PublicResume = z.infer<typeof publicResumeSchema>;
