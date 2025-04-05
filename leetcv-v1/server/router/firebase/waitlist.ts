import { createFirestoreRouter } from "../custom/createFirestoreRouter";
import { z } from "zod";

export const waitListRouter = createFirestoreRouter()
  .query("getHandle", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      const resumeQuery = ctx.firestore
        .collection("usernames")
        .where("userId", "==", input.id);

      const querySnapshot = await resumeQuery.get();
      const documentIds: any = [];

      querySnapshot.forEach((doc) => {
        documentIds.push(doc.id);
      });

      return documentIds[0];
    },
  })
  .mutation("isDeletingUser", {
    input: z.object({
      id: z.string().nonempty("User ID is required"),
      email: z.string().email("Invalid email address"),
    }),
    async resolve({ ctx, input }) {
      try {
        await ctx.firestore.collection("users").doc(input.id).delete();

        await ctx.firestore.collection("resumes").doc(input.id).delete();

        const usernamesSnapshot = await ctx.firestore
          .collection("usernames")
          .where("userId", "==", input.id)
          .get();
        const deleteUsernamePromises = usernamesSnapshot.docs.map((doc) =>
          doc.ref.delete()
        );
        await Promise.all(deleteUsernamePromises);

        await ctx.firestore
          .collection("coupons")
          .doc("college-invite")
          .collection("adminList")
          .doc(input.email)
          .delete();

        return { success: true };
      } catch (error) {
        console.error("Error deleting user:", error);
        throw new Error("Failed to delete user.");
      }
    },
  });
