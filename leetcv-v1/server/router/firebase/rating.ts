import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createFirestoreRouter } from "../custom/createFirestoreRouter";
import { Handle } from "data/models/Handle";
import admin from "../firebaseAdmin";

export const ratingRouter = createFirestoreRouter()
  .mutation("setRating", {
    input: z.object({
      id: z.string(),
      handle: z.string(),
      count: z.number().optional(),
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

      ctx.firestore
        .collection("users")
        .doc(targetHandle.userId)
        .collection("ratings")
        .doc(input.id)
        .set({
          id: input.id,
          ratedAt: admin.firestore.FieldValue.serverTimestamp(),
        });
    },
  })
  .mutation("deleteRating", {
    input: z.object({
      id: z.string(),
      handle: z.string(),
      count: z.number().optional(),
    }),
    async resolve({ ctx, input }) {
      const handleRef = ctx.firestore.collection("usernames").doc(input.handle);
      const handleRecord = await handleRef.get();
      if (!handleRecord.exists) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "usernames not found",
        });
      }

      const targetUser = handleRecord.data() as Handle;

      ctx.firestore
        .collection("users")
        .doc(targetUser.userId)
        .collection("ratings")
        .doc(input.id)
        .delete();
    },
  })

  .query("getRating", {
    input: z.object({
      id: z.string(),
      handle: z.string(),
    }),
    async resolve({ ctx, input }) {
      const username = ctx.firestore.collection("usernames").doc(input.handle);
      const recordRef = await username.get();
      if (!recordRef.exists) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "usernames not found",
        });
      }

      const targetUserHandle = recordRef.data() as Handle;

      const userRef = ctx.firestore
        .collection("users")
        .doc(targetUserHandle.userId)
        .collection("ratings");
      const query = userRef;
      const snapshot = await query.count().get();

      const snapshotRef = await userRef
        .where("id", "==", input.id)
        .count()
        .get();

      const updateStar = ctx.firestore
        .collection("resumes")
        .doc(targetUserHandle.userId);

      await ctx.firestore.runTransaction((transaction) => {
        return transaction.get(updateStar).then((sfDoc) => {
          if (!sfDoc.exists) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "rating cannot be updated",
            });
          }

          transaction.update(updateStar, { rating: snapshot.data().count });
        });
      });

      return {
        count: snapshot.data().count,
        currentUser: snapshotRef.data().count,
      };
    },
  });
