import { TRPCError } from "@trpc/server";
import { RequestList } from "data/models/RequestList";
import { ReviewSchema } from "data/models/Review";
import { categoryReviewSchema } from "data/schemas/category.schema";
import { reviewSchema } from "data/schemas/review.schema";
import { z } from "zod";
import { createFirestoreRouter } from "../custom/createFirestoreRouter";
import admin from "../firebaseAdmin";
import { Handle } from "data/models/Handle";

const getUserReviews = async (
  ctx: any,
  userId: string,
  reviewCategory: string
) => {
  if (ctx.session?.user.id !== userId) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "User can only look up their own information",
    });
  }

  const userRef = ctx.firestore.collection("users").doc(userId);
  const record = await userRef.get();

  if (!record.exists) {
    throw new TRPCError({ code: "BAD_REQUEST", message: "User not found" });
  }

  const snapshot = await userRef
    .collection(reviewCategory)
    .orderBy("createdAt", "desc")
    .get();

  return snapshot.docs.map((doc: any) => doc.data() as RequestList);
};

export const reviewRouter = createFirestoreRouter()
  .mutation("create", {
    input: reviewSchema,
    async resolve({ ctx, input }) {
      const userRef = ctx.firestore.collection("users").doc(input.requestId);
      const userNameRef = ctx.firestore
        .collection("resumes")
        .doc(input.requestId);
      const resumeRef = ctx.firestore.collection("resumes").doc(input.userId);
      const record = await userRef.get();
      const userNameRefRecord = await userNameRef.get();
      const resumeData = (await resumeRef.get()).data();
      const targetUser = userNameRefRecord.data();

      if (!record.exists) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "User not found" });
      }

      const setReview = {
        userId: input.userId,
        id: input.id,
        requestId: input.requestId,
        username: input.username,
        email: input.email,
        image: input.image,
        content: input.content,
        status: input.status,
        reviewTitle: input.reviewTitle,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        requesterHandle: resumeData?.handle,
        requestedHandle: targetUser?.handle,
        upVoteCount: 0,
        flagCount: 0,
        requesterPosition: resumeData?.position,
        requesterImage: resumeData?.image,
      };

      userRef.collection(input.reviewCategory).doc(input.id).set(setReview);
      userRef.collection("unseenNotifications").doc(input.requestId).set(
        {
          review: true,
        },
        { merge: true }
      );
    },
  })
  .query("getAll", {
    input: z.object({
      userId: z.string(),
      reviewCategory: categoryReviewSchema,
    }),
    async resolve({ ctx, input }) {
      return getUserReviews(ctx, input.userId, input.reviewCategory);
    },
  })
  .query("getReviewsByCategory", {
    input: z.object({
      userId: z.string(),
      reviewCategory: categoryReviewSchema,
      page: z.number(),
      status: z.string(),
    }),
    async resolve({ ctx, input }) {
      const limit = Number(process.env.TOTAL_ITEMS_PER_PAGE);
      const page = input.page ?? 1;

      const reviewsList = await getUserReviews(
        ctx,
        input.userId,
        input.reviewCategory
      );

      const filteredData = reviewsList.filter(
        (review: RequestList) => review.status === input.status
      );
      const totalPages = Math.ceil(filteredData.length / limit);
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const reviews = filteredData.slice(startIndex, endIndex) as RequestList[];

      return {
        reviews,
        totalPages,
      };
    },
  })

  .query("get", {
    input: z.object({
      userId: z.string(),
      reviewCategory: categoryReviewSchema,
      requestId: z.string(),
      postId: z.string().optional(),
    }),
    async resolve({ ctx, input }) {
      const usersCollection = ctx.firestore.collection("users");
      const userDocRef = usersCollection.doc(input.requestId);
      const userSnapshot = await userDocRef.get();
      if (!userSnapshot.exists) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "User not found" });
      }
      const reviewsCollection = userDocRef.collection(input.reviewCategory);
      let reviewSnapshot;
      if (input.postId) {
        reviewSnapshot = await reviewsCollection
          .where("reviewTitle", "==", input.postId)
          .get();
      } else {
        reviewSnapshot = await reviewsCollection
          .orderBy("createdAt", "desc")
          .get();
      }
      return reviewSnapshot.docs.map((doc) => doc.data() as ReviewSchema);
    },
  })
  .mutation("setUpVote", {
    input: z.object({
      id: z.string(),
      handle: z.string(),
      flagCount: z.number(),
      upVoteCount: z.number(),
      handleCollection: z.string(),
    }),
    async resolve({ ctx, input }) {
      const usernameRef = ctx.firestore
        .collection("usernames")
        .doc(input.handle);
      const usernameRecordRef = await usernameRef.get();
      if (!usernameRecordRef.exists) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "usernames not found",
        });
      }
      const targetHandle = usernameRecordRef.data() as Handle;
      const updateData = {
        id: input.id,
        flagCount: input.flagCount,
        upVoteCount: input.upVoteCount,
        ratedAt: admin.firestore.FieldValue.serverTimestamp(),
      };
      ctx.firestore
        .collection("users")
        .doc(targetHandle.userId)
        .collection(input.handleCollection)
        .doc(input.id)
        .set(updateData, { merge: true });
    },
  })
  .query("getpendingNotifications", {
    input: z.object({
      userId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userRef = ctx.firestore.collection("users").doc(input.userId);
      const record = await userRef.get();

      if (!record.exists) {
        return {
          review: false,
          attestation: false,
          request: false,
        };
      }

      const notifications = await userRef
        .collection("unseenNotifications")
        .doc(input.userId)
        .get();
      if (!notifications.exists) {
        return {
          review: false,
          attestation: false,
          request: false,
        };
      }
      return notifications.data();
    },
  })
  .mutation("updateStatus", {
    input: z.object({
      userId: z.string(),
      type: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userRef = ctx.firestore.collection("users").doc(input.userId);
      const record = await userRef.get();
      if (!record.exists) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "User not found" });
      }
      await userRef
        .collection("unseenNotifications")
        .doc(input.userId)
        .set(
          {
            [input.type]: false,
          },
          { merge: true }
        );
    },
  });
