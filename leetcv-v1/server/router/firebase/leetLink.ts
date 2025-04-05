import { z } from "zod";
import { TRPCError } from "@trpc/server";
import {
  customLinksSchema,
  socialMediaSchema,
  themeSchema,
} from "data/schemas/leetLink.schema";
import { LeetLinkState } from "data/models/LeetLink";
import { createPublicFirestoreRouter } from "../custom/createPublicFirebaseRouter";

export const leetLinkRouter = createPublicFirestoreRouter()
  .mutation("updateBioAndHeader", {
    input: z.object({
      id: z.string(),
      bio: z.string(),
      header: z.string(),
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
        .collection("leetLink")
        .doc(input.id)
        .set(
          {
            bio: input.bio,
            header: input.header,
          },
          { merge: true }
        );
    },
  })
  .mutation("updateCustomLinks", {
    input: z.object({
      id: z.string(),
      customLinks: z.array(customLinksSchema),
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
        .collection("leetLink")
        .doc(input.id)
        .set(
          {
            customLinks: input.customLinks,
          },
          { merge: true }
        );
    },
  })
  .mutation("updateSocialLinks", {
    input: z.object({
      id: z.string(),
      socialLinks: z.array(socialMediaSchema),
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
        .collection("leetLink")
        .doc(input.id)
        .set(
          {
            socialLinks: input.socialLinks,
          },
          { merge: true }
        );
    },
  })
  .mutation("updateTheme", {
    input: z.object({
      id: z.string(),
      theme: themeSchema,
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
        .collection("leetLink")
        .doc(input.id)
        .set(
          {
            theme: input.theme,
          },
          { merge: true }
        );
    },
  })
  .query("getLeetLink", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      const handleRef = ctx.firestore
        .collection("users")
        .doc(input.id)
        .collection("leetLink")
        .doc(input.id);
      const handleRecord = await handleRef.get();

      if (!handleRecord.exists) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "LeetLink not found",
        });
      }

      const data = handleRecord.data();
      return {
        bio: data?.bio,
        header: data?.header,
        customLinks: data?.customLinks,
        socialLinks: data?.socialLinks,
        theme: data?.theme,
      } as LeetLinkState;
    },
  })
  .mutation("deleteCustomLink", {
    input: z.object({
      id: z.string(),
      linkId: z.string(),
    }),
    async resolve({ ctx, input }) {
      if (ctx.session?.user.id !== input.id) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User can only update their own information",
        });
      }

      const leetLinkRef = ctx.firestore
        .collection("users")
        .doc(input.id)
        .collection("leetLink")
        .doc(input.id);

      const leetLinkDoc = await leetLinkRef.get();

      if (!leetLinkDoc.exists) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "LeetLink not found",
        });
      }

      const leetLinkData = leetLinkDoc.data();

      const updatedCustomLinks = (leetLinkData?.customLinks || []).filter(
        (link: { id: string }) => link.id !== input.linkId
      );

      await leetLinkRef.set(
        {
          customLinks: updatedCustomLinks,
        },
        { merge: true }
      );
    },
  });
