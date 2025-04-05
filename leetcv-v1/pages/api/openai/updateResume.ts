import { Resume } from "data/models/UserInfo";
import { NextApiRequest, NextApiResponse } from "next";

import admin from "server/router/firebaseAdmin";

export default async function updateResume(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const resume:Resume = req.body;

    try {
      // Use firebase admin to perform operations
      const db = admin.firestore();
      let resumeCollection = db.collection('openai-resume');
      
      // Extract id from the incoming resume
      const { id } = resume;

      // Get the document reference
      const docRef = resumeCollection.doc(id);

      // Check if the document exists
      const doc = await docRef.get();

      if (doc.exists) {
        // If the document exists, update it
        await docRef.update(resume);
      } else {
        // If the document does not exist, create it
        await docRef.set(resume);
      }
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update resume' });
    }
  
    return res.status(200).json({
      updatedResume: resume
    });
  }
}