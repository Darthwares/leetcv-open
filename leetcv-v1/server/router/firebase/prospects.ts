import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createFirestoreRouter } from "../custom/createFirestoreRouter";
import { Prospect } from "data/models/Prospect";
import { filterAndPaginateData } from "../utils/paginationAndFilter";

export const prospectRouter = createFirestoreRouter()
  .query("getAll", {
    input: z.object({
      id: z.string(),
      page: z.number().optional(),
      status: z.string().optional(),
    }),
    async resolve({ ctx, input }) {
      const limit = Number(process.env.TOTAL_ITEMS_PER_PAGE);
      const page = input.page ?? 1;
      if (ctx.session?.user.id !== input.id) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User can only look up to their own information",
        });
      }
      const userRef = ctx.firestore.collection("users").doc(input.id);
      const userRecord = await userRef.get();
      if (!userRecord.exists) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "User not found" });
      }
      const snapshot = await userRef
        .collection("prospects")
        .orderBy("prospectAt", "desc")
        .get();
      const handle: Prospect[] = snapshot.docs.map((doc) => {
        const docData = doc.data();
        return {
          ...docData,
          id: doc.id,
        } as Prospect;
      });
      const result = filterAndPaginateData(handle, input, page, limit);
      return result;
    },
  })
  .query("getCount", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      if (ctx.session?.user.id !== input.id) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User can only see their own information",
        });
      }
      const user = ctx.firestore.collection("users").doc(input.id);
      const recordRef = await user.get();
      if (!recordRef.exists) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "User not found" });
      }
      const snapshot = await user.collection("prospects").count().get();
      return snapshot.data().count;
    },
  });
