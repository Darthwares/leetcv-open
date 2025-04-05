import { z } from "zod";
import { certificateSchema } from "data/schemas/certificate.schema";

export type Certificate = z.infer<typeof certificateSchema>;
