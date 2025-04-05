import { ServiceAccount } from "firebase-admin";
import { NextApiRequest, NextApiResponse } from "next";
import admin from "server/router/firebaseAdmin";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
});

if (!admin.apps.length) {
  const serviceAccount = JSON.parse(
    process.env.ADMIN as string
  ) as ServiceAccount;

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }

  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const db = admin.firestore();
    const userDoc = await db.collection("stripePaidUsers").doc(userId).get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: "User not found" });
    }

    const userData = userDoc.data();
    const stripeCustomerId = userData?.stripeCustomerId;

    if (!stripeCustomerId) {
      return res.status(400).json({ error: "Stripe Customer ID not found" });
    }

    const return_Url =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/"
        : "https://www.leetcv.com/";

    const session = await stripe.billingPortal.sessions.create({
      customer: stripeCustomerId,
      return_url: return_Url,
    });

    res.status(200).json({ url: session.url });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default handler;
