import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createFirestoreRouter } from "../custom/createFirestoreRouter";
import { Handle } from "data/models/Handle";
import admin from "../firebaseAdmin";
import { Resume } from "data/models/UserInfo";

export const followerRouter = createFirestoreRouter()
  .mutation("setFollowers", {
    input: z.object({
      id: z.string(),
      handle: z.string(),
      userHandle: z.string(),
      userImage: z.string(),
      name: z.string(),
      profession: z.string(),
    }),
    async resolve({ ctx, input }) {
      const handleRef = ctx.firestore.collection("usernames").doc(input.handle);
      const handleRecord = await handleRef.get();
      if (!handleRecord.exists) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "User not found" });
      }

      const targetHandle = handleRecord.data() as Handle;

      ctx.firestore
        .collection("users")
        .doc(targetHandle.userId)
        .collection("followers")
        .doc(input.id)
        .set({
          id: input.id,
          followedAt: admin.firestore.FieldValue.serverTimestamp(),
          userHandle: input.userHandle,
          userImage: input.userImage,
          userName: input.name,
          profession: input.profession,
        });

      const targetUserRef = ctx.firestore
        .collection("resumes")
        .doc(targetHandle.userId);

      const snapshot = await targetUserRef.get();

      if (!snapshot.exists) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "User not found" });
      }

      const targetUser = snapshot.data() as Resume;

      ctx.firestore
        .collection("users")
        .doc(input.id)
        .collection("following")
        .doc(targetHandle.userId)
        .set({
          id: input.id,
          followedAt: admin.firestore.FieldValue.serverTimestamp(),
          userHandle: targetUser.handle,
          userImage: targetUser.image,
          userName: targetUser.displayName,
          profession: targetUser.position,
          followingId: targetUser.id,
        });
    },
  })
  .mutation("deleteFollowers", {
    input: z.object({
      id: z.string(),
      handle: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userNameRef = ctx.firestore
        .collection("usernames")
        .doc(input.handle);
      const usernameRecord = await userNameRef.get();
      if (!usernameRecord.exists) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "User not found" });
      }

      const targetHandle = usernameRecord.data() as Handle;

      ctx.firestore
        .collection("users")
        .doc(targetHandle.userId)
        .collection("followers")
        .doc(input.id)
        .delete();

      ctx.firestore
        .collection("users")
        .doc(input.id)
        .collection("following")
        .doc(targetHandle.userId)
        .delete();
    },
  })

  .query("getFollowers", {
    input: z.object({
      id: z.string(),
      handle: z.string(),
      page: z.number().optional(),
    }),
    async resolve({ ctx, input }) {
      const limit = Number(process.env.TOTAL_ITEMS_PER_PAGE);
      const page = input.page ?? 1;

      const userNameRef = ctx.firestore
        .collection("usernames")
        .doc(input.handle);
      const userNameRecord = await userNameRef.get();
      if (!userNameRecord.exists) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "User not found" });
      }

      const targetHandle = userNameRecord.data() as Handle;

      const collectionRef = ctx.firestore
        .collection("users")
        .doc(targetHandle.userId)
        .collection("followers");
      const query = collectionRef;
      const snapshot = await query.count().get();

      const snapshotRef = await collectionRef
        .where("id", "==", input.id)
        .count()
        .get();

      const updateStar = ctx.firestore
        .collection("resumes")
        .doc(targetHandle.userId);

      await ctx.firestore.runTransaction((transaction) => {
        return transaction.get(updateStar).then((sfDoc) => {
          transaction.update(updateStar, { followers: snapshot.data().count });
        });
      });

      const followerRef = ctx.firestore
        .collection("users")
        .doc(targetHandle.userId)
        .collection("followers")
        .orderBy("followedAt", "desc");
      const followersRecord = await followerRef.get();
      const followers = followersRecord.docs.map((doc) => doc.data());

      const totalPages = Math.ceil(followers.length / limit);
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const followersData = followers.slice(startIndex, endIndex);

      return {
        count: snapshot.data().count,
        currentUser: snapshotRef.data().count,
        list: followersData,
        totalPages,
      };
    },
  })

  .query("getFollowingList", {
    input: z.object({
      id: z.string(),
      handle: z.string(),
      page: z.number().optional(),
    }),
    async resolve({ ctx, input }) {
      const userNameRef = ctx.firestore
        .collection("usernames")
        .doc(input.handle);
      const userNameRecord = await userNameRef.get();
      const targetHandle = userNameRecord.data() as Handle;

      const collectionRef = ctx.firestore
        .collection("users")
        .doc(input.id)
        .collection("following");
      const query = collectionRef;
      const snapshot = await query.count().get();

      const followingRef = ctx.firestore
        .collection("users")
        .doc(targetHandle.userId)
        .collection("following")
        .orderBy("followedAt", "desc");
      const followingRecord = await followingRef.get();
      const following = followingRecord.docs.map((doc) => doc.data());

      const page = input.page ?? 1;
      const limit = Number(process.env.TOTAL_ITEMS_PER_PAGE);

      const totalPages = Math.ceil(following.length / limit);
      const start = (page - 1) * limit;
      const end = start + limit;
      const followingsData = following.slice(start, end);

      return {
        count: snapshot.data().count,
        list: followingsData,
        totalPages,
      };
    },
  });
