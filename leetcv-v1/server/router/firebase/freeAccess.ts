import { z } from "zod";
import { createFirestoreRouter } from "../custom/createFirestoreRouter";

export const freeAccessRouter = createFirestoreRouter()
  .query("getEndDate", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      const { id } = input;

      const docRef = ctx.firestore
        .collection("users")
        .doc(id)
        .collection("free-access")
        .doc(id);
      const userRecordRef = await docRef.get();
      if (!userRecordRef.exists) {
        return false;
      } else {
        const endDate = userRecordRef.data()?.endDate;
        return endDate;
      }
    },
  });
