import { StripePayouts } from "data/models/Stripe";
import { z } from "zod";
import { createPublicFirestoreRouter } from "../custom/createPublicFirebaseRouter";

export const publicStripeRouter = createPublicFirestoreRouter().query(
  "proUser",
  {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userId = input.id;

      const userName = ctx.firestore
        .collection("stripePaidUsers")
        .doc(userId)
        .get();

      const isPremiumUser = (await userName)?.data();
      return isPremiumUser as StripePayouts;
    },
  }
);
