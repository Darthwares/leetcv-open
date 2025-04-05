import { z } from "zod";
import { createFirestoreRouter } from "../custom/createFirestoreRouter";
import { TRPCError } from "@trpc/server";

export const projectIdeasRouter = createFirestoreRouter()
  .mutation("saveProjectIdeas", {
    input: z.object({
      id: z.string(),
      projectIdeas: z
        .object({
          basic: z.array(z.string()).optional(),
          medium: z.array(z.string()).optional(),
          hard: z.array(z.string()).optional(),
        })
        .default({
          basic: [],
          medium: [],
          hard: [],
        }),
    }),
    async resolve({ ctx, input }) {
      console.log("Received saveProjectIdeas input:", input);

      if (ctx.session?.user.id !== input.id) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User can only look up their own information",
        });
      }

      await ctx.firestore
        .collection("users")
        .doc(input.id)
        .collection("project-ideas")
        .doc(input.id)
        .set(
          {
            projectIdeas: {
              basic: input.projectIdeas.basic,
              medium: input.projectIdeas.medium,
              hard: input.projectIdeas.hard,
            },
          },
          { merge: true }
        );

      console.log(`Project ideas saved for user: ${input.id}`);
    },
  })
  .query("getProjectIdeas", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      const handleRef = ctx.firestore
        .collection("users")
        .doc(input.id)
        .collection("project-ideas")
        .doc(input.id);

      const handleRecord = await handleRef.get();

      if (!handleRecord.exists) {
        console.warn(
          `projectIdeas document does not exist for user: ${input.id}. Returning default values.`
        );
        return {
          basic: [],
          medium: [],
          hard: [],
        };
      }

      const data = handleRecord.data()?.projectIdeas;
      console.log(`Retrieved projectIdeas for user: ${input.id}`, data);

      return {
        basic: Array.isArray(data?.basic) ? data.basic : [],
        medium: Array.isArray(data?.medium) ? data.medium : [],
        hard: Array.isArray(data?.hard) ? data.hard : [],
      };
    },
  });
