import { z } from "zod";
import { stripePayoutsSchema } from "data/schemas/stripe.schema";

export type StripePayouts = z.infer<typeof stripePayoutsSchema>;
