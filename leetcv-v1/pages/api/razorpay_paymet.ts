import { NextApiRequest, NextApiResponse } from "next";
import admin from "server/router/firebaseAdmin";
import Razorpay from "razorpay";
import { ServiceAccount } from "firebase-admin";
import crypto from "crypto";

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_SECRET_ID!,
});

const adminProcess = process.env.ADMIN! as string;

if (adminProcess) {
  const serviceAccount = JSON.parse(adminProcess) as ServiceAccount;
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
}

let db: any = admin.firestore();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const {
      razorpay_payment_id,
      razorpay_subscription_id,
      razorpay_signature,
    } = req.body;

    try {
      const updates = razorpay_payment_id + "|" + razorpay_subscription_id;
      const generated_signature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET_ID as string)
        .update(updates)
        .digest("hex");

      const authenticated = generated_signature === razorpay_signature;

      if (req.body.event === "subscription.charged") {
        console.log("req.body.event", req.body.event);
        const users = await db.collection(`stripePaidUsers`);

        const subscription = await instance.subscriptions.fetch(
          req.body.payload.subscription?.entity.id
        );
        const planIdToNameMap = {
          [process.env.NEXT_PUBLIC_RAZORPAY_PLAN_ID_600!]: "Premium",
          [process.env.NEXT_PUBLIC_RAZORPAY_PLAN_ID_1500!]: "Pro",

          [process.env.NEXT_PUBLIC_RAZORPAY_PLAN_ID_430!]: "Premium",
          [process.env.NEXT_PUBLIC_RAZORPAY_PLAN_ID_29427!]: "Premium",
          [process.env.NEXT_PUBLIC_RAZORPAY_PLAN_ID_21019!]: "Premium",
          [process.env.NEXT_PUBLIC_RAZORPAY_PLAN_ID_84076!]: "Pro",
          [process.env.NEXT_PUBLIC_RAZORPAY_PLAN_ID_126114!]: "Pro",
          [process.env.NEXT_PUBLIC_RAZORPAY_PLAN_ID_681018!]: "Pro",

          [process.env.NEXT_PUBLIC_RAZORPAY_PLAN_ID_16636!]: "Premium",
          [process.env.NEXT_PUBLIC_RAZORPAY_PLAN_ID_182991!]: "Premium",
          [process.env.NEXT_PUBLIC_RAZORPAY_PLAN_ID_83178!]: "Pro",
          [process.env.NEXT_PUBLIC_RAZORPAY_PLAN_ID_956542!]: "Pro",

          [process.env.NEXT_PUBLIC_RAZORPAY_PLAN_ID_500!]: "Premium",
          [process.env.NEXT_PUBLIC_RAZORPAY_PLAN_ID_375!]: "Premium",

          [process.env.NEXT_PUBLIC_RAZORPAY_PLAN_ID_1806!]: "Premium",
          [process.env.NEXT_PUBLIC_RAZORPAY_PLAN_ID_3354!]: "Premium",

          [process.env.NEXT_PUBLIC_RAZORPAY_PLAN_ID_5296!]: "Pro",
          [process.env.NEXT_PUBLIC_RAZORPAY_PLAN_ID_9836!]: "Pro",
        };

        const payment = await instance.payments.fetch(
          req.body.payload.payment?.entity.id
        );

        const currentPlan = planIdToNameMap[subscription.plan_id] || "";

        const customer = await instance.invoices.fetch(payment?.invoice_id!);
        const planData = await instance.plans.fetch(subscription.plan_id);

        users
          .where(
            "stripeCustomerId",
            "==",
            req.body.payload.subscription?.entity.customer_id
          )
          .get()
          .then((querySnapshot: any) => {
            querySnapshot.forEach(async (doc: any) => {
              const userRef = db.collection("users").doc(doc.id);
              const userRecord = await userRef.get();

              await users.doc(doc.id).set(
                {
                  stripeMembershipStatus:
                    req.body.payload.subscription?.entity.status === "active" &&
                    "Active",
                  stripePeriodStart: new Date(
                    req.body.payload.subscription?.entity.current_start! * 1000
                  ),
                  stripePeriodEnd: new Date(
                    req.body.payload.subscription?.entity.current_end! * 1000
                  ),

                  subscriptionPlan: currentPlan,
                  updatedAt: admin.firestore.FieldValue.serverTimestamp(),
                  stripePriceId: planData.id,
                  stripeCustomerId:
                    subscription.customer_id ?? customer.customer_id,
                  stripePlanType: planData.period,
                  purchasedPlan: (planData.item.amount as number) / 100,
                },
                { merge: true }
              );
            });
          });
      }

      if (req.body.event === "subscription.updated") {
        console.log("req.body.event", req.body.event);
        const users = await db.collection(`stripePaidUsers`);

        users
          .where(
            "stripeCustomerId",
            "==",
            req.body.payload.subscription?.entity.customer_id
          )
          .get()
          .then((querySnapshot: any) => {
            querySnapshot.forEach(async (doc: any) => {
              await users.doc(doc.id).set(
                {
                  stripePeriodStart: new Date(
                    req.body.payload.subscription?.entity.current_start! * 1000
                  ),
                  stripePeriodEnd: new Date(
                    req.body.payload.subscription?.entity.current_end! * 1000
                  ),
                },
                { merge: true }
              );
            });
          });
      }

      if (req.body.event === "subscription.cancelled") {
        const users = await db.collection(`stripePaidUsers`);
        console.log("req.body.event", req.body.event);

        console.log(
          "req.body.payload.subscription",
          req.body.payload.subscription
        );
        users
          .where(
            "stripeCustomerId",
            "==",
            req.body.payload.subscription?.entity.customer_id
          )
          .get()
          .then((querySnapshot: any) => {
            querySnapshot.forEach(async (doc: any) => {
              await users.doc(doc.id).set(
                {
                  stripeMembershipStatus: "Inactive",
                  stripeUserSubscriptionStatus: "unsubscribed",
                  subscriptionPlan: "",
                  cancelledAt: admin.firestore.FieldValue.serverTimestamp(),
                },
                { merge: true }
              );

              db.collection("users")
                .doc(doc.id)
                .collection("gpt-token")
                .doc(doc.id)
                .set({
                  count: 2500,
                });
            });
          });
      }

      if (authenticated) {
        console.log("authenticated", authenticated);
        const subscription = await instance.subscriptions.fetch(
          razorpay_subscription_id
        );
        const planIdToNameMap = {
          [process.env.NEXT_PUBLIC_RAZORPAY_PLAN_ID_600!]: "Premium",
          [process.env.NEXT_PUBLIC_RAZORPAY_PLAN_ID_1500!]: "Pro",

          [process.env.NEXT_PUBLIC_RAZORPAY_PLAN_ID_16636!]: "Premium",
          [process.env.NEXT_PUBLIC_RAZORPAY_PLAN_ID_83178!]: "Pro",
          [process.env.NEXT_PUBLIC_RAZORPAY_PLAN_ID_182991!]: "Premium",
          [process.env.NEXT_PUBLIC_RAZORPAY_PLAN_ID_956542!]: "Pro",

          [process.env.NEXT_PUBLIC_RAZORPAY_PLAN_ID_430!]: "Premium",
          [process.env.NEXT_PUBLIC_RAZORPAY_PLAN_ID_126114!]: "Pro",
          [process.env.NEXT_PUBLIC_RAZORPAY_PLAN_ID_29427!]: "Premium",
          [process.env.NEXT_PUBLIC_RAZORPAY_PLAN_ID_681018!]: "Pro",
          [process.env.NEXT_PUBLIC_RAZORPAY_PLAN_ID_21019!]: "Premium",
          [process.env.NEXT_PUBLIC_RAZORPAY_PLAN_ID_84076!]: "Pro",

          [process.env.NEXT_PUBLIC_RAZORPAY_PLAN_ID_500!]: "Premium",
          [process.env.NEXT_PUBLIC_RAZORPAY_PLAN_ID_375!]: "Premium",

          [process.env.NEXT_PUBLIC_RAZORPAY_PLAN_ID_1806!]: "Premium",
          [process.env.NEXT_PUBLIC_RAZORPAY_PLAN_ID_3354!]: "Premium",

          [process.env.NEXT_PUBLIC_RAZORPAY_PLAN_ID_5296!]: "Pro",
          [process.env.NEXT_PUBLIC_RAZORPAY_PLAN_ID_9836!]: "Pro",
        };

        const payment = await instance.payments.fetch(razorpay_payment_id);

        const currentPlan = planIdToNameMap[subscription.plan_id] || "";

        const customer = await instance.invoices.fetch(payment?.invoice_id!);

        const users = await db.collection(`stripePaidUsers`);

        if (!subscription.customer_id) {
          res.status(500).send({
            message: `Subscription not found!`,
          });
        }
        users
          .where("stripeCustomerId", "==", subscription.customer_id)
          .get()
          .then((querySnapshot: any) => {
            querySnapshot.forEach(async (doc: any) => {
              const resumeRef = db.collection("resumes").doc(doc.id);
              const resumesRecord = await resumeRef.get();

              const planData = await instance.plans.fetch(subscription.plan_id);

              await users.doc(doc.id).set({
                subscriptionPlan: currentPlan,
                userId: doc.id,
                updatedAt: admin.firestore.FieldValue.serverTimestamp(),
                stripeSubscriptionId: razorpay_subscription_id,
                stripePriceId: planData.id,
                stripeCustomerId:
                  subscription.customer_id ?? customer.customer_id,
                stripeMembershipStatus: "Active",
                stripePlanType: planData.period,
                paidBy: "Razorpay",
                stripeCustomerName: resumesRecord.data().displayName,
                stripeUserSubscriptionStatus: "subscribed",
                userEmail: resumesRecord.data().email,
                stripePeriodStart: admin.firestore.FieldValue.serverTimestamp(),
                stripePeriodEnd: new Date(subscription?.current_end! * 1000),
                purchasedPlan: (planData.item.amount as number) / 100,
              });

              const planTokensMap: { [key: string]: number } = {
                [process.env.NEXT_PUBLIC_RAZORPAY_PLAN_ID_600!]: 15000, // 5 usd
                [process.env.NEXT_PUBLIC_RAZORPAY_PLAN_ID_1500!]: 25000, // 15 usd

                [process.env.NEXT_PUBLIC_RAZORPAY_PLAN_ID_430!]: 15000, // 5 usd
                [process.env.NEXT_PUBLIC_RAZORPAY_PLAN_ID_126114!]: 25000, // 15 usd
                [process.env.NEXT_PUBLIC_RAZORPAY_PLAN_ID_29427!]: 30000, // 3.5 usd
                [process.env.NEXT_PUBLIC_RAZORPAY_PLAN_ID_681018!]: 40000, // 13.5 usd
                [process.env.NEXT_PUBLIC_RAZORPAY_PLAN_ID_21019!]: 60000, // 2.5 usd
                [process.env.NEXT_PUBLIC_RAZORPAY_PLAN_ID_84076!]: 100000, // 10 usd pro

                [process.env.NEXT_PUBLIC_RAZORPAY_PLAN_ID_16636!]: 15000, // 5 usd
                [process.env.NEXT_PUBLIC_RAZORPAY_PLAN_ID_182991!]: 25000, // 15 usd
                [process.env.NEXT_PUBLIC_RAZORPAY_PLAN_ID_83178!]: 30000, // 3.5 usd
                [process.env.NEXT_PUBLIC_RAZORPAY_PLAN_ID_956542!]: 40000, // 13.5 usd

                [process.env.NEXT_PUBLIC_RAZORPAY_PLAN_ID_500!]: 30000, // 30 usd
                [process.env.NEXT_PUBLIC_RAZORPAY_PLAN_ID_375!]: 80000, // 45 usd

                [process.env.NEXT_PUBLIC_RAZORPAY_PLAN_ID_1806!]: 30000, // 30 usd
                [process.env.NEXT_PUBLIC_RAZORPAY_PLAN_ID_3354!]: 80000, // 45 usd

                [process.env.NEXT_PUBLIC_RAZORPAY_PLAN_ID_5296!]: 40000, // 50 usd
                [process.env.NEXT_PUBLIC_RAZORPAY_PLAN_ID_9836!]: 100000, // 100 usd
              };

              const totalTokens = planTokensMap[subscription.plan_id] || 2500;

              db.collection("users")
                .doc(doc.id)
                .collection("gpt-token")
                .doc(doc.id)
                .set({
                  count: totalTokens,
                });
            });
          });

        res.redirect(301, `/paymentVerification`);
      }
    } catch (error) {
      console.error("Error creating subscription:", error);
    }
  }
}
