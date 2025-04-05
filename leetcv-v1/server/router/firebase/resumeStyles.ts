import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createPublicFirestoreRouter } from "../custom/createPublicFirebaseRouter";
import { ResumeStyle } from "data/models/ResumeStyle";
import { fontStyleSchema } from "data/schemas/resumeStyle.schema";

export const resumeStylesRouter = createPublicFirestoreRouter()
  .mutation("updateColor", {
    input: z.object({
      id: z.string(),
      color: z.string(),
    }),
    async resolve({ ctx, input }) {
      if (ctx.session?.user.id !== input.id) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User can only update their own information",
        });
      }
      await ctx.firestore
        .collection("users")
        .doc(input.id)
        .collection("resume-styles")
        .doc(input.id)
        .set(
          {
            color: input.color,
          },
          { merge: true }
        );
    },
  })
  .mutation("updateFontStyle", {
    input: z.object({
      id: z.string(),
      font: fontStyleSchema,
    }),
    async resolve({ ctx, input }) {
      if (ctx.session?.user.id !== input.id) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User can only update their own information",
        });
      }
      await ctx.firestore
        .collection("users")
        .doc(input.id)
        .collection("resume-styles")
        .doc(input.id)
        .set(
          {
            font: input.font,
          },
          { merge: true }
        );
    },
  })
  .mutation("updateBannerColor", {
    input: z.object({
      id: z.string(),
      bannerColor: z.string(),
    }),
    async resolve({ ctx, input }) {
      if (ctx.session?.user.id !== input.id) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User can only update their own information",
        });
      }
      await ctx.firestore
        .collection("users")
        .doc(input.id)
        .collection("resume-styles")
        .doc(input.id)
        .set(
          {
            bannerColor: input.bannerColor,
          },
          { merge: true }
        );
    },
  })
  .query("getResumeStyles", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      const handleRef = ctx.firestore
        .collection("users")
        .doc(input.id)
        .collection("resume-styles")
        .doc(input.id);
      const handleRecord = await handleRef.get();

      if (!handleRecord.exists) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Resume styles not found",
        });
      }

      const data = handleRecord.data();
      return {
        color: data?.color,
        font: data?.font,
        bannerColor: data?.bannerColor,
      } as ResumeStyle;
    },
  });
