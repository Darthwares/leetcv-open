import { Resume } from "data/models/UserInfo";
import { NextApiRequest, NextApiResponse } from "next";

import admin from "server/router/firebaseAdmin";

export default async function createResume(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const resume: Resume = req.body;
    if (!resume.id) {
      return res.status(400).json({ error: 'Resume id is required' });
    }
    
    try {
      // Use firebase admin to perform operations
      const db = admin.firestore();
      let resumeCollection = db.collection('openai-resume');
      
      // Check if id for the requested resume is present, if not create it
      const resumeExists = await resumeCollection.doc(resume.id).get();
      if (!resumeExists.exists) {
        await resumeCollection.doc(resume.id).set(resume);
      }
    } catch (error) {
      return res.status(500).json({ error: 'Failed to create or update resume' });
    }
  
    return res.status(200).json({
      id: resume.id,
      resumeViewUrl: 'https://leetcv.com/openai/resume/' + resume.id,
    });
  }
}