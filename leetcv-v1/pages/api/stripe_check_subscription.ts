import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { subscription_id } = req.body;

    if (!subscription_id) {
      return res.status(400).json({ error: "Subscription ID is required" });
    }

    try {
      const subscription = await stripe.subscriptions.retrieve(subscription_id);

      const isActive = subscription.status === "active";

      return res.status(200).json({ subscription: isActive });
    } catch (error) {
      console.error("Error fetching subscription:", error);
      return res.status(500).json({ error: "Error fetching subscription" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
