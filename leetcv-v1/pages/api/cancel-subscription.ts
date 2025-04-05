import { ServiceAccount } from "firebase-admin";
import { NextApiRequest, NextApiResponse } from "next";
import admin from "server/router/firebaseAdmin";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export default async function cancelSubscription(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { subscriptionId, client_reference_id } = req.body;

      const serviceAccount = JSON.parse(
        process.env.ADMIN as string
      ) as ServiceAccount;

      let db: any = admin.firestore();
      const users = db.collection(`stripePaidUsers`);

      if (!db) {
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
        });
      }

      await stripe.subscriptions.update(subscriptionId, {
        cancel_at_period_end: true,
      });

      users.doc(client_reference_id).set(
        {
          stripeUserSubscriptionStatus: "unsubscribed",
          cancelledAt: admin.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      );

      res.status(200).json({ message: "Subscription canceled successfully." });
    } catch (error) {
      console.error("Error canceling subscription:", error);
      res.status(500).json({ error: "Failed to cancel subscription." });
    }
  } else {
    res.status(400).json({ error: "Invalid request method." });
  }
}
