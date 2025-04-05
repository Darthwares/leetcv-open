import { z } from "zod";
import { patentSchema } from "data/schemas/patentSchema.schema";

export type Patent = z.infer<typeof patentSchema>;
