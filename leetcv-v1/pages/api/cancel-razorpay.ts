import { ServiceAccount } from "firebase-admin";
import admin from "server/router/firebaseAdmin";
import type { NextApiRequest, NextApiResponse } from "next";
import { instance } from "./razorpay_checkout_session";

type RequestBody = {
  subscription_id: string;
  id: string;
};
type ResponseData = {
  success: boolean;
  message: string;
  response?: object;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { id, subscription_id } = req.body as RequestBody;

    const serviceAccount = JSON.parse(
      process.env.ADMIN as string
    ) as ServiceAccount;

    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    }

    const db = admin.firestore();
    const users = db.collection(`stripePaidUsers`);

    await instance.subscriptions.cancel(subscription_id, true);

    await users.doc(id).set(
      {
        stripeUserSubscriptionStatus: "unsubscribed",
        cancelledAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    return res.status(200).json({ success: true, message: "Cancelled" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}
