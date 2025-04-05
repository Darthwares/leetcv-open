import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createFirestoreRouter } from "../custom/createFirestoreRouter";

export const couponRouter = createFirestoreRouter()
  .query("getPromoCode", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      if (ctx.session?.user.id !== input.id) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User can only look up their own information",
        });
      }
      const couponsCollection = ctx.firestore.collection("coupons");
      const couponRecord = await couponsCollection.doc("couponId").get();

      if (!couponRecord.exists) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Coupon not found",
        });
      }

      const userCouponsCollection = couponsCollection
        .doc("couponId")
        .collection("redeemedUsers");
      const userCouponRecord = await userCouponsCollection.doc(input.id).get();

      const currentUserData = userCouponRecord.data();
      const redeemedCouponSet = new Set(currentUserData?.redeemedCoupon);

      const couponData = couponRecord?.data();
      const isValidCoupon = redeemedCouponSet.has(couponData?.couponCode!);

      return {
        couponCode: couponData?.couponCode!,
        isRedeemCouponCode: isValidCoupon,
      };
    },
  })

  .mutation("create", {
    input: z.object({
      id: z.string(),
      couponCode: z.string(),
    }),
    async resolve({ ctx, input }) {
      if (ctx.session?.user.id !== input.id) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User can only update their own privacy setting",
        });
      }

      const userCouponRef = ctx.firestore
        .collection("coupons")
        .doc("couponId")
        .collection("redeemedUsers")
        .doc(input.id);
      const userCouponRecord = await userCouponRef.get();

      const currentUserData = userCouponRecord.data();
      const redeemedCouponSet = new Set(currentUserData?.redeemedCoupon);

      const couponRef = ctx.firestore.collection("coupons").doc("couponId");
      const couponRecord = await couponRef.get();
      const storedCouponCode = couponRecord?.data()?.couponCode;
      const isValidCoupon = redeemedCouponSet.has(input.couponCode);

      const gptTokenRef = ctx.firestore
        .collection("users")
        .doc(input.id)
        .collection("gpt-token")
        .doc(input.id);

      if (storedCouponCode === input.couponCode) {
        updateTokenCount(gptTokenRef);

        if (!userCouponRecord.exists) {
          return userCouponRef.set(
            {
              redeemedCoupon: [input.couponCode],
            },
            { merge: true }
          );
        } else if (!isValidCoupon) {
          redeemedCouponSet.add(input.couponCode);
          return userCouponRef.set(
            {
              redeemedCoupon: [...redeemedCouponSet],
            },
            { merge: true }
          );
        }
      }
      async function updateTokenCount(
        docRef: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>
      ): Promise<void> {
        try {
          const doc = await docRef.get();

          if (!doc.exists) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "RedeemedCoupon failed. Please try again later.",
            });
          }

          const currentCount = doc.data()?.count || 0;
          const newCount = currentCount + 10000;

          await docRef.set({ count: newCount });
        } catch (error) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "RedeemedCoupon failed. Please try again later.",
          });
        }
      }
    },
  });
