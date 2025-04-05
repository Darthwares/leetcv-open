import { TRPCError } from "@trpc/server";
import * as trpc from "@trpc/server";
import { Context } from "../context";

export function createPublicFirestoreRouter() {
  return trpc
    .router<Context>()
    .middleware(async ({ ctx, next }) => {
      if (!ctx.firestore) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Firestore not initialized",
        });
      }

      return next();
    });
}
