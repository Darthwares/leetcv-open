import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createFirestoreRouter } from "../custom/createFirestoreRouter";
import { Handle } from "data/models/Handle";

export const gptTokenRouter = createFirestoreRouter()
  .query("checkToken", {
    input: z.object({
      id: z.string(),
      handle: z.string().optional(),
    }),
    async resolve({ ctx, input }) {
      const gptTokenRef = ctx.firestore
        .collection("users")
        .doc(input.id)
        .collection("gpt-token")
        .doc(input.id);

      const snapshot = await gptTokenRef.get();

      if (snapshot.exists) {
        return snapshot?.data()?.count || 0;
      }
      return await gptTokenRef.set({
        count: Number(process.env.MANAGE_GPT_TOKENS),
      });
    },
  })

  .mutation("setGPTToken", {
    input: z.object({
      handle: z.string(),
      count: z.number().optional(),
    }),
    async resolve({ ctx, input }) {
      const userRef = ctx.firestore.collection("usernames").doc(input.handle);
      const recordRef = await userRef.get();
      if (!recordRef.exists) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "usernames not found",
        });
      }

      const userTarget = recordRef.data() as Handle;

      ctx.firestore
        .collection("users")
        .doc(userTarget.userId)
        .collection("gpt-token")
        .doc(userTarget.userId)
        .set({
          count: input.count ?? 0,
        });
    },
  })

  .query("getRedoCount", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      const token = ctx.firestore
        .collection("users")
        .doc(input.id)
        .collection("resume-redo-count")
        .doc(input.id);
      const tokenSnapshot = await token.get();
      const tokenData = tokenSnapshot.exists ? tokenSnapshot.data() : null;
      return tokenData?.count ?? 0; 
    },
  })

  .mutation("setRedoCount", {
    input: z.object({
      id: z.string(),
      count: z.number().optional(),
    }),
    async resolve({ ctx, input }) {
      ctx.firestore
        .collection("users")
        .doc(input.id)
        .collection("resume-redo-count")
        .doc(input.id)
        .set({
          count: input.count ?? 0,
        });
    },
  });
