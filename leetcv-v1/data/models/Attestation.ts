import { z } from "zod";
import {
  attestationSchema,
  requestAttestation,
} from "data/schemas/attestation.schema";

export type Attestation = z.infer<typeof attestationSchema>;

export type RequestAttestation = z.infer<typeof requestAttestation>;
