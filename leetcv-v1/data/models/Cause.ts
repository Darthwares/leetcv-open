import { z } from "zod";
import { causeSchema } from "data/schemas/cause.schema";

export type Cause = z.infer<typeof causeSchema>;
