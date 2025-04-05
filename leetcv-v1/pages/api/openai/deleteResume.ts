import { NextApiRequest, NextApiResponse } from "next";

import admin from "server/router/firebaseAdmin";

interface RequestBody {
  resumeId: string;
}

export default async function updateResume(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { resumeId }: RequestBody = req.body;

    try {
      // Use firebase admin to perform operations
      const db = admin.firestore();
      let resumeCollection = db.collection('openai-resume');
      
      // Get the document reference
      const docRef = resumeCollection.doc(resumeId);

      // Check if the document exists
      const doc = await docRef.get();

      if (doc.exists) {
        // If the document exists, delete it
        await docRef.delete();
      }
    } catch (error) {
      return res.status(500).json({ error: 'Failed to delete resume' });
    }
  
    return res.status(200).json({
      message: 'Resume deleted successfully'
    });
  }
}