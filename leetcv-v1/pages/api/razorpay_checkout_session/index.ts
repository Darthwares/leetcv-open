import { NextApiRequest, NextApiResponse } from "next";
import Razorpay from "razorpay";
import admin from "server/router/firebaseAdmin";
import { ServiceAccount } from "firebase-admin";
import { isEligibleForSpecificDomain } from "@constants/defaults";

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
      plan_id,
      total_count,
      amount,
      name,
      email,
      contact,
      customerId,
      id,
      paidBy,
    } = req.body;

    try {
      const paidUsers = await db.collection(`stripePaidUsers`);
      const users = await db.collection(`users`);
      let priceId = Number(Math.round(amount));
      let customer;
      const isStripeUser = paidBy === "Stripe";

      const existingCustomers = await instance.customers.all();
      const matchedCustomer = existingCustomers.items.find(
        (customer) => customer.email === email
      );

      if (customerId === "" || customerId === undefined) {
        if (!matchedCustomer?.id) {
          customer = await instance.customers.create({
            name,
            email,
            contact,
          });
        }
        const customerIdToSet = matchedCustomer?.id
          ? matchedCustomer.id.startsWith("cust_")
            ? matchedCustomer.id
            : `cust_${matchedCustomer.id}`
          : customer?.id
          ? customer.id.startsWith("cust_")
            ? customer.id
            : `cust_${customer.id}`
          : undefined;

        await paidUsers.doc(id).set(
          {
            stripeCustomerId: customerIdToSet,
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
            paidBy: "Razorpay",
            userEmail: email,
            stripeMembershipStatus: "Created",
          },
          {
            merge: true,
          }
        );

        await users.doc(id).collection("razorpay-customerid").doc(id).set({
          razorpayCustomerId: customerIdToSet,
        });
      }

      if (matchedCustomer?.id) {
        const customerIdToSet = matchedCustomer.id.startsWith("cust_")
          ? matchedCustomer.id
          : `cust_${matchedCustomer.id}`;

        await paidUsers.doc(id).set(
          {
            stripeCustomerId: customerIdToSet,
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
            paidBy: "Razorpay",
            userEmail: email,
            stripeMembershipStatus: "Created",
          },
          {
            merge: true,
          }
        );

        await users.doc(id).collection("razorpay-customerid").doc(id).set({
          razorpayCustomerId: customerIdToSet,
        });
      }

      const orderId = await instance.orders.create({
        amount: priceId,
        currency: "INR",
      });

      let offerId;

      const isEligibleForOffer = isEligibleForSpecificDomain(email);

      // if (isEligibleForOffer) {
      //   console.log("eligible for offer", 1135 == priceId, priceId);
      //   switch (priceId) {
      //     // semi Premium - 3000 ( 500 x 6 )
      //     case 500:
      //       offerId = "offer_PLVzNFq42icKqE";
      //       break;
      //     // semi yearly Pro -  6810.18 ( 1135.03 x 6 )
      //     case 1135:
      //       offerId = "offer_PLYfEG8GanZACk";
      //       break;
          
      //     // yearly premium - 4500 ( 375 x 12 )
      //     case 375:
      //       offerId = "offer_PLWbfCyUPCHi9D";
      //       break;
      //     // yearly Pro - 10089.12 ( 840.76 x 12 )
      //     case 841:
      //       offerId = "offer_PLYq2HtlhUcuIv";
      //       break;
          
      //     default:
      //       offerId = undefined;
      //       break;
      //   }
      // } else {
      //   offerId = undefined;
      // }

      const params = {
        plan_id,
        total_count,
        quantity: 1,
        customer_id: customer?.id ? customer?.id : customerId,
        customer_notify: true,
        // offer_id: offerId,
      };

      const subscription = await instance.subscriptions.create(params);

      res.status(200).json({ subscription, orderId });
    } catch (error) {
      console.error("Error creating subscription:", error);
      const responseError =
        error instanceof Error ? error.message : "Internal Server Error";
      res.status(500).json({ error: responseError });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
