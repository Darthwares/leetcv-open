import { z } from "zod";
import { publicationSchema } from "data/schemas/publication.schema";

export type Publication = z.infer<typeof publicationSchema>;
