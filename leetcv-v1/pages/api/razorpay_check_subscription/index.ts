import { NextApiRequest, NextApiResponse } from "next";
import Razorpay from "razorpay";

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_SECRET_ID!,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { subscription_id } = req.body;
    try {
      const subscription = await instance.subscriptions.fetch(subscription_id);

      if (subscription.status === "active") {
        console.log("🚀 ~ active subscriber :", subscription_id);
        return res.status(200).json({ subscription: true });
      } else {
        console.log("🚀 ~ inactive subscriber :", subscription_id);
        return res.status(200).json({ subscription: false });
      }
    } catch (error) {
      console.error("Error fetching subscription:", error);
      const responseError =
        error instanceof Error ? error.message : "Internal Server Error";
      res.status(500).json({ error: responseError });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
