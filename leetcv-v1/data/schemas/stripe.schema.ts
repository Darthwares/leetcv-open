import { z } from "zod";

export const stripePayoutsSchema = z.object({
  paidBy: z.string(),
  stripeCustomerId: z.string(),
  stripeCustomerName: z.string(),
  stripeMembershipStatus: z.string(),
  purchasedPlan: z.number(),
  stripePeriodEnd: z.string(),
  stripePeriodStart: z.string(),
  stripePlanType: z.string(),
  stripePriceId: z.string(),
  stripeSubscriptionId: z.string(),
  stripeUserSubscriptionStatus: z.string(),
  subscriptionPlan: z.string(),
  userEmail: z.string(),
});
