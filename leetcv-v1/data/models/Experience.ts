import { z } from "zod";
import { experienceSchema } from "data/schemas/experience.schema";

export type Experience = z.infer<typeof experienceSchema>;
