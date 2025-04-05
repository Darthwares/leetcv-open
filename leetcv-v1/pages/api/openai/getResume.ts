import { NextApiRequest, NextApiResponse } from "next";

import admin from "server/router/firebaseAdmin";

export default async function getResume(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { id } = req.body;

    try {
      // Use firebase admin to perform operations
      const db = admin.firestore();
      let resumeCollection = db.collection("openai-resume");

      // Get the document reference
      const docRef = resumeCollection.doc(id as string);

      // Check if the document exists
      const doc = await docRef.get();

      if (doc.exists) {
        // If the document exists, return it
        return res.status(200).json(doc.data());
      } else {
        // If the document does not exist, return an error
        return res.status(404).json({ error: "Resume not found" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Failed to get resume" });
    }
  }
}
