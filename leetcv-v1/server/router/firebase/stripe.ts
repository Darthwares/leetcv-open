import { Handle } from "data/models/Handle";
import { createFirestoreRouter } from "../custom/createFirestoreRouter";
import { StripePayouts } from "data/models/Stripe";
import { z } from "zod";

export const stripeRouter = createFirestoreRouter()
  .query("proUser", {
    async resolve({ ctx }) {
      const userId = ctx.session?.user.id.trim();

      const userName = ctx.firestore
        .collection("stripePaidUsers")
        .doc(userId!)
        .get();

      const isPremiumUser = (await userName)?.data();

      return isPremiumUser as StripePayouts;
    },
  })
  .query("getRazoapayCustId", {
    async resolve({ ctx }) {
      const userId = ctx.session?.user.id.trim();

      const razorpayCustomerId = ctx.firestore
        .collection("users")
        .doc(userId!)
        .collection("razorpay-customerid")
        .doc(userId!)
        .get();

      const customerId = (await razorpayCustomerId)?.data()?.razorpayCustomerId;

      return customerId as string;
    },
  })

  .mutation("isSubscribedUser", {
    input: z.object({
      handle: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userNameRef = ctx.firestore
        .collection("usernames")
        .doc(input.handle);
      const userNameRecordRef = await userNameRef.get();

      const userHandleTarget = userNameRecordRef.data() as Handle;
      return ctx.firestore
        .collection("stripePaidUsers")
        .doc(userHandleTarget.userId)
        .set(
          {
            stripeMembershipStatus: "Inactive",
            stripeUserSubscriptionStatus: "unsubscribed",
          },
          { merge: true }
        );
    },
  });
