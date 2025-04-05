import { z } from "zod";
import { createFirestoreRouter } from "../custom/createFirestoreRouter";
import { TRPCError } from "@trpc/server";
import admin from "../firebaseAdmin";

export const browserDataRouter = createFirestoreRouter().mutation("saveData", {
  input: z.object({
    id: z.string(),
    browserData: z.object({
      os: z.string(),
      browser: z.string(),
      device: z.string(),
    }),
  }),
  async resolve({ ctx, input }) {
    if (ctx.session?.user.id !== input.id) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "User can update their own information",
      });
    }

    const browserDetectionRef = ctx.firestore
      .collection("users")
      .doc(input.id)
      .collection("browser-detection")
      .doc(input.id);

    const browserDataDoc = await browserDetectionRef.get();
    const newBrowserData = {
      ...input.browserData,
      lastVisited: new Date().toISOString(),
    };

    if (!browserDataDoc.exists) {
      console.log("Creating new document with browser data");
      await browserDetectionRef.set({
        browsers: [newBrowserData],
      });

      return { success: true, message: "Browser data saved successfully." };
    }

    const existingData = browserDataDoc.data()?.browsers || [];
    // console.log(existingData,"existingData")

    const isBrowserDataExist = existingData.some(
      (entry: { os: string; browser: string; device: string }) =>
        entry.os === input.browserData.os &&
        entry.browser === input.browserData.browser &&
        entry.device === input.browserData.device
    );

    // If similar browser data exists, do nothing
    if (isBrowserDataExist) {
      return {
        success: true,
        message: "Browser data already exists, no changes made.",
      };
    }

    // If not, add the new browser data to the array
    await browserDetectionRef.update({
      browsers: admin.firestore.FieldValue.arrayUnion(newBrowserData), // Append newBrowserData to the array
    });
    // console.log("Added new browser data");

    return { success: true, message: "New browser data added successfully." };
  },
});
