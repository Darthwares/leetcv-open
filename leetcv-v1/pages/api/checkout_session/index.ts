import { calculatePlanAndPriceId } from "@constants/defaults";
import { NextApiRequest, NextApiResponse } from "next";

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { order_id, plan } = req.body.metadata;

    try {
      const { priceId } = calculatePlanAndPriceId(order_id, plan);

      const params: Stripe.Checkout.SessionCreateParams = {
        mode: "subscription",
        payment_method_types: ["us_bank_account", "card"],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        success_url: `${req.headers.origin}/checkoutSuccess?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/cancel`,
        automatic_tax: { enabled: true },
        ...req.body,
      };

      const checkoutSession: Stripe.Checkout.Session =
        await stripe.checkout.sessions.create(params);

      res.status(200).json(checkoutSession);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Internal server error";
      res.status(500).json({ statusCode: 500, message: errorMessage });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
