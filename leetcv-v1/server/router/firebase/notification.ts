import { z } from "zod";
import { createFirestoreRouter } from "../custom/createFirestoreRouter";
import admin from "../firebaseAdmin";
import { Handle } from "data/models/Handle";
import { Resume, UserToken } from "data/models/UserInfo";
import { Username } from "data/models/User";
import { TRPCError } from "@trpc/server";

export const notificationRouter = createFirestoreRouter()
  .mutation("sendRequestNotification", {
    input: z.object({
      handle: z.string(),
      userId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const requestUserNameRef = ctx.firestore
        .collection("usernames")
        .doc(input.handle);
      const userNameRecord = await requestUserNameRef.get();

      const targetHandle = userNameRecord.data() as Handle;

      const notificationRef = ctx.firestore
        .collection("notifications")
        .doc(targetHandle.userId);

      const record = await notificationRef.get();
      const requestUserToken = record.data() as UserToken;

      if (!requestUserToken || !requestUserToken.token) {
        console.error("No valid token found for the user.");
        return;
      }

      const resumeRef = await ctx.firestore
        .collection("resumes")
        .doc(input.userId)
        .get();
      const user = resumeRef.data() as Username;

      if (!user) {
        console.error("User not found for the given userId.");
        return;
      }

      requestUserToken.token.map((token) => {
        const message = {
          token,
          data: {
            title: `You have a follow request from - ${user.displayName}`,
            body: "Click to Approve the request",
            imageUrl: "https://www.leetcv.com/maskable_icon.png",
            click_action: "https://www.leetcv.com/s/requests?notification=true",
          },
        };

        admin
          .messaging()
          .send(message)
          .then((response) => {
            console.log("Successfully sent message:", response);
          })
          .catch((error) => {
            console.log("Error sending message:", error);
          });
      });
    },
  })
  .mutation("sendApprovalNotification", {
    input: z.object({
      handle: z.string(),
      userId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const approvalUserNameRef = ctx.firestore
        .collection("usernames")
        .doc(input.handle);
      const userNameRecord = await approvalUserNameRef.get();

      const targetApprovedHandle = userNameRecord.data() as Handle;

      const approveNotificationRef = ctx.firestore
        .collection("notifications")
        .doc(targetApprovedHandle.userId);

      const approveResumeRef = await ctx.firestore
        .collection("resumes")
        .doc(input.userId)
        .get();
      const user = approveResumeRef.data() as Resume;

      const approvedRecord = await approveNotificationRef.get();
      const approvedUserToken = approvedRecord.data() as UserToken;

      if (!approvedUserToken || !approvedUserToken.token) {
        console.error("No valid token found for the user.");
        return;
      }

      approvedUserToken.token.map((token) => {
        const requestAccessPayload = {
          token,
          data: {
            title: `Your Request has been approved by ${user.displayName}`,
            body: "Click to view it",
            imageUrl: "https://www.leetcv.com/maskable_icon.png",
            click_action:
              "https://www.leetcv.com/s/prospects?notification=true",
          },
        };

        admin
          .messaging()
          .send(requestAccessPayload)
          .then((response) => {
            console.log("Successfully sent message:", response);
          })
          .catch((error) => {
            console.log("Error sending message:", error);
          });
      });
    },
  })
  .mutation("followerNotification", {
    input: z.object({
      handle: z.string(),
      userId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userNameRef = ctx.firestore
        .collection("usernames")
        .doc(input.handle);
      const userNameRecord = await userNameRef.get();

      const targetFollowedHandle = userNameRecord.data() as Handle;

      const followNotificationRef = ctx.firestore
        .collection("notifications")
        .doc(targetFollowedHandle.userId);

      const followRecord = await followNotificationRef.get();
      const userToken = followRecord.data() as UserToken;

      if (!userToken || !userToken.token) {
        console.error("No valid token found for the user.");
        return;
      }

      const resumesRef = await ctx.firestore
        .collection("resumes")
        .doc(input.userId)
        .get();
      const user = resumesRef.data() as Username;

      userToken.token.map((token) => {
        const requestAccessPayload = {
          token,
          data: {
            title: `${user.displayName} started following you`,
            body: `${user.displayName} started following you.`,
            imageUrl: "https://www.leetcv.com/maskable_icon.png",
            click_action:
              "https://www.leetcv.com/s/followers?notification=true",
          },
        };

        admin
          .messaging()
          .send(requestAccessPayload)
          .then((response) => {
            console.log("Successfully sent message:", response);
          })
          .catch((error) => {
            console.log("Error sending message:", error);
          });
      });
    },
  })
  .mutation("starNotification", {
    input: z.object({
      handle: z.string(),
      userId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const starRef = ctx.firestore.collection("usernames").doc(input.handle);
      const starRecord = await starRef.get();

      const targetStarHandle = starRecord.data() as Handle;

      const StarNotificationRef = ctx.firestore
        .collection("notifications")
        .doc(targetStarHandle.userId);

      const starFollowRecord = await StarNotificationRef.get();
      const getToken = starFollowRecord.data() as UserToken;

      if (!getToken || !getToken.token) {
        console.error("No valid token found for the user.");
        return;
      }

      const resumesRef = await ctx.firestore
        .collection("resumes")
        .doc(input.userId)
        .get();
      const user = resumesRef.data() as Username;

      if (!user) {
        console.error("User not found for the given userId.");
        return;
      }

      getToken.token.map((token) => {
        const starPayload = {
          token,
          data: {
            title: `${user.displayName} starred your Resume`,
            body: `${user.displayName} starred your Resume.`,
            imageUrl: "https://www.leetcv.com/maskable_icon.png",
            click_action:
              "https://www.leetcv.com/s/dashboard?notification=true",
          },
        };

        admin
          .messaging()
          .send(starPayload)
          .then((response) => {
            console.log("Successfully sent message:", response);
          })
          .catch((error) => {
            console.log("Error sending message:", error);
          });
      });
    },
  })
  .mutation("setReview", {
    input: z.object({
      handle: z.string(),
      userId: z.string(),
      reviewSection: z.string(),
    }),
    async resolve({ ctx, input }) {
      const reviewUsernameRef = ctx.firestore
        .collection("usernames")
        .doc(input.handle);
      const reviewUserRevord = await reviewUsernameRef.get();

      const targetReviewHandle = reviewUserRevord.data() as Handle;

      const reviewedRef = ctx.firestore
        .collection("notifications")
        .doc(targetReviewHandle.userId);

      const hasToken = await reviewedRef.get();
      const isToken = hasToken.data() as UserToken;

      if (!isToken || !isToken.token) {
        console.error("No valid token found for the user.");
        return;
      }

      const reviewUserRef = await ctx.firestore
        .collection("resumes")
        .doc(input.userId)
        .get();
      const user = reviewUserRef.data() as Username;

      if (!user) {
        console.error("User not found for the given userId.");
        return;
      }

      isToken.token.map((token) => {
        const reviewPayload = {
          token,
          data: {
            title: `${user.displayName} added a Review`,
            body: `${user.displayName} added a review on your resume in the ${input.reviewSection} section, please check on the review section.`,
            imageUrl: "https://www.leetcv.com/maskable_icon.png",
            click_action: "https://www.leetcv.com/s/reviews?notification=true",
          },
        };

        admin.messaging().send(reviewPayload);
      });
    },
  })
  .mutation("createToken", {
    input: z.object({
      id: z.string(),
      name: z.string(),
      token: z.string(),
    }),
    async resolve({ ctx, input }) {
      const { token, id } = input;

      console.log("input", input);

      const createNotificationRef = ctx.firestore
        .collection("notifications")
        .doc(input.id);

      const resumeRef = (
        await ctx.firestore.collection("resumes").doc(input.id).get()
      ).data() as Resume;
      const existingNotification = await createNotificationRef.get();

      console.log("existingNotification.data()", existingNotification.data());
      const existingData = existingNotification.data() || { token: [] };
      const updatedTokens = Array.isArray(existingData.token)
        ? existingData.token.includes(token)
          ? existingData.token
          : [...existingData.token, token]
        : [token]; // If token is not an array, create a new array with the token

      createNotificationRef.set({
        id,
        name: resumeRef.displayName,
        lastUpdated: admin.firestore.FieldValue.serverTimestamp(),
        token: updatedTokens,
      });
    },
  })
  .mutation("messageNotification", {
    input: z.object({
      handle: z.string(),
      name: z.string(),
    }),
    async resolve({ ctx, input }) {
      const messageRef = ctx.firestore
        .collection("usernames")
        .doc(input.handle);
      const messageRecord = await messageRef.get();

      const targetMessageHandle = messageRecord.data() as Handle;

      const MessageNotificationRef = ctx.firestore
        .collection("notifications")
        .doc(targetMessageHandle.userId);

      const messageFollowRecord = await MessageNotificationRef.get();
      const getToken = messageFollowRecord.data() as UserToken;

      if (!getToken || !getToken.token) {
        console.error("No valid token found for the user.");
        return;
      }

      getToken.token.map((token) => {
        const messagePayload = {
          token,
          data: {
            title: `New message from ${input.name}`,
            body: `${input.name} has sent you a new message. Check it out!`,
            imageUrl: "https://www.leetcv.com/maskable_icon.png",
            click_action: "https://www.leetcv.com/s/messages?notification=true",
          },
        };

        admin
          .messaging()
          .send(messagePayload)
          .then((response) => {
            console.log("Successfully sent message:", response);
          })
          .catch((error) => {
            console.log("Error sending message:", error);
          });
      });
    },
  })
  .query("marketingProgram", {
    async resolve({ ctx }) {
      const marketingProgramRef = await ctx.firestore
        .collection("socialMediaPromotion")
        .doc("marketingProgramList")
        .get();

      return marketingProgramRef.data();
    },
  })
  .query("influencerProgram", {
    async resolve({ ctx }) {
      const marketingProgramRef = await ctx.firestore
        .collection("socialMediaPromotion")
        .doc("influencers")
        .get();
      return marketingProgramRef.data();
    },
  })
  .mutation("notificationTracking", {
    input: z.object({
      id: z.string(),
      name: z.string(),
      handle: z.string(),
      type: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userNameRef = ctx.firestore
        .collection("usernames")
        .doc(input.handle);
      const userNameRecordRef = await userNameRef.get();
      if (!userNameRecordRef.exists) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "usernames not found",
        });
      }
      const userTarget = userNameRecordRef.data() as Handle;
      ctx.firestore
        .collection("users")
        .doc(userTarget.userId)
        .collection("notifications")
        .doc(userTarget.userId)
        .set({
          type: input.type,
          userName: input.name,
          userId: userTarget.userId,
          lastVisitedOn: admin.firestore.FieldValue.serverTimestamp(),
        });
    },
  });
