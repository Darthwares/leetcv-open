import { ServiceAccount } from "firebase-admin";
import { buffer } from "micro";
import Cors from "micro-cors";
import { NextApiRequest, NextApiResponse } from "next";
import admin from "server/router/firebaseAdmin";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET as string;
// const webhookSecret: string =
//   "whsec_ab3e54b8eb9adc4de6dda4c153eb821be7af92d0930ff44078f3927977ece189";

const cors = Cors({
  allowMethods: ["POST", "HEAD"],
});

const webhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const buf = await buffer(req);
      const sig = req.headers["stripe-signature"] as string;

      if (!sig) {
        console.error("Missing Stripe signature");
        return res.status(400).json({ message: "Missing Stripe signature" });
      }

      let event;

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

      try {
        event = stripe.webhooks.constructEvent(
          buf.toString(),
          sig,
          webhookSecret
        );
      } catch (error: any) {
        console.error(
          `Webhook signature verification failed: ${error.message}`
        );
        return res.status(400).json({ message: "Webhook Error" });
      }

      switch (event.type) {
        case "checkout.session.completed":
          await handleCheckoutSessionCompleted(event, users, db);
          break;
        case "customer.subscription.deleted":
          await handleSubscriptionDeleted(event, users, db);
          break;
        case "customer.subscription.updated":
          await handleSubscriptionUpdated(event, users, db);
          break;
        default:
          console.log(`Unhandled event type ${event.type}`);
      }

      return res.status(200).json({ message: "successful" });
    } catch (error: any) {
      console.error(`Webhook failed: ${error.message}`);
      return res.status(500).json({ message: "webhook failed" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
export default cors(webhookHandler as any);

async function handleCheckoutSessionCompleted(
  event: Stripe.Event,
  users: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>,
  db: FirebaseFirestore.Firestore
) {
  const session: Stripe.Checkout.Session = event.data
    .object as Stripe.Checkout.Session;

  if (
    !session.subscription ||
    !session.customer ||
    !session.client_reference_id
  ) {
    console.error("Missing necessary session data");
    return;
  }

  const subscription = await stripe.subscriptions.retrieve(
    session.subscription as string
  );

  const { periodStartDate, periodEndDate } = convertStripeTimestampsToDate(
    session.created,
    subscription.current_period_end
  );

  const price = session.amount_total!;
  const plan = getPlanName(subscription?.items.data[0]?.price?.unit_amount!);

  console.log("session.amount_total", session.amount_total);

  const planTokensMap: { [key: number]: number } = {
    500: 15000, // 5 usd
    1500: 25000,

    8100: 40000,

    12000: 100000,

    3600: 30000,
    5400: 80000,

    700: 15000,
    1800: 25000,

    2200: 30000,
    6300: 40000,

    4000: 80000,
    11600: 100000,
  };

  const totalTokens =
    planTokensMap[subscription?.items.data[0]?.price?.unit_amount!] || 2500; // Changed 'plan' to 'price' for correct mapping
  console.log("totalTokens 1", totalTokens);

  console.log(
    "subscription?.items.data[0]?.price?.unit_amount",
    subscription?.items.data[0]?.price?.unit_amount
  );

  const userData = {
    stripePeriodEnd: periodEndDate,
    stripePeriodStart: periodStartDate,
    stripeCustomerId: session?.customer,
    stripeSubscriptionId: session?.subscription,
    stripePriceId: subscription?.items?.data[0]?.price?.id,
    stripePlanType:
      subscription?.items?.data[0]?.plan?.interval === "month"
        ? "Monthly"
        : "Annual",
    stripeMembershipStatus: "Active",
    paidBy: "Stripe",
    stripeCustomerName: session?.customer_details?.name,
    stripeUserSubscriptionStatus: "subscribed",
    purchasedPlan: subscription?.items.data[0]?.price?.unit_amount!, // $2 saves in database as 200, $10 as 1000 (100 = 1$)
    userEmail: session?.customer_details?.email,
    subscriptionPlan: plan,
  };

  console.log("User Data:", userData);

  await users.doc(session.client_reference_id).set(userData);

  await db
    .collection("users")
    .doc(session.client_reference_id)
    .collection("gpt-token")
    .doc(session.client_reference_id)
    .set({
      count: totalTokens,
    });
}

async function handleSubscriptionDeleted(
  event: Stripe.Event,
  users: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>,
  db: FirebaseFirestore.Firestore
) {
  const subscription = event.data.object as Stripe.Subscription;

  if (!subscription.customer) {
    console.error("Missing customer data in subscription deleted event");
    return;
  }

  const customerId = subscription.customer as string;
  const clientReferenceId = await getClientReferenceIdByCustomerId(
    customerId,
    db
  );

  if (clientReferenceId) {
    await users.doc(clientReferenceId).set(
      {
        stripeMembershipStatus: "Inactive",
        stripeUserSubscriptionStatus: "unsubscribed",
        subscriptionPlan: "",
        stripeCustomerId: "",
        cancelledAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    await db
      .collection("users")
      .doc(clientReferenceId)
      .collection("gpt-token")
      .doc(clientReferenceId)
      .set(
        {
          count: 2500,
        },
        { merge: true }
      );
  }
}

async function handleSubscriptionUpdated(
  event: Stripe.Event,
  users: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>,
  db: FirebaseFirestore.Firestore
) {
  const subscription = event.data.object as Stripe.Subscription;

  if (!subscription.customer) {
    console.error("Missing customer data in subscription updated event");
    return;
  }

  const customerId = subscription.customer as string;
  const clientReferenceId = await getClientReferenceIdByCustomerId(
    customerId,
    db
  );

  const { periodStartDate, periodEndDate } = convertStripeTimestampsToDate(
    subscription.current_period_start,
    subscription.current_period_end
  );

  const price = subscription?.items?.data[0]?.plan?.amount!;
  const plan = getPlanName(subscription?.items.data[0]?.price?.unit_amount!);
  const planTokensMap: { [key: number]: number } = {
    500: 15000, // 5 usd
    1500: 25000,

    8100: 40000,

    12000: 100000,

    3600: 30000,
    5400: 80000,

    700: 15000,
    1800: 25000,

    2200: 30000,
    6300: 40000,

    4000: 80000,
    11600: 100000,
  };

  const totalTokens =
    planTokensMap[subscription?.items.data[0]?.price?.unit_amount!] || 2500;

  console.log("totalTokens 2", totalTokens);

  // const totalTokens = plan === "Premium" ? 50000 : 100000;

  if (clientReferenceId) {
    await users.doc(clientReferenceId).set(
      {
        stripePeriodStart: periodStartDate,
        stripePeriodEnd: periodEndDate,
        stripeCustomerId: subscription.customer,
        stripeSubscriptionId: subscription?.id,
        stripeMembershipStatus: "Active",
        stripeUserSubscriptionStatus: "subscribed",
        subscriptionPlan: plan,
        stripePriceId: subscription?.items?.data[0]?.price.id,
        stripePlanType:
          subscription?.items?.data[0]?.plan?.interval === "month"
            ? "Monthly"
            : "Annual",
        purchasedPlan: subscription?.items.data[0]?.price?.unit_amount!, // $2 saves in database as 200, $10 as 1000 (100 = 1$)
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    await db
      .collection("users")
      .doc(clientReferenceId)
      .collection("gpt-token")
      .doc(clientReferenceId)
      .set(
        {
          count: totalTokens,
        },
        { merge: true }
      );
  }
}

async function getClientReferenceIdByCustomerId(customerId: string, db: any) {
  const usersCollection = db.collection("stripePaidUsers");
  const snapshot = await usersCollection
    .where("stripeCustomerId", "==", customerId)
    .get();
  if (!snapshot.empty) {
    const doc = snapshot.docs[0];
    return doc.id;
  }
  return null;
}

function getPlanName(price: number) {
  console.log("price is getPlanName", price);
  switch (price) {
    case 500:
    case 375:
    case 43000:
    case 2100:
    case 176562:
    case 3000:
    case 252228:
    case 4500:
    case 3600:
    case 5400:
    case 700:
    case 2200:
    case 4000:
      return "Premium";
    case 1500:
    case 126119:
    case 8100:
    case 681018:
    case 12000:
    case 1008932:
    case 1800:
    case 6300:
    case 11600:
      return "Pro";
    default:
      return "";
  }
}

function convertStripeTimestampsToDate(
  startTimestamp: number,
  endTimestamp: number
) {
  const periodStartDate = new Date(startTimestamp * 1000);
  const periodEndDate = new Date(endTimestamp * 1000);
  return { periodStartDate, periodEndDate };
}
