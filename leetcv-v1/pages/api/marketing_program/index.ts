import { NextApiRequest, NextApiResponse } from "next";
import { ServiceAccount } from "firebase-admin";
import admin from "server/router/firebaseAdmin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { hit, socialMedia, programType } = req.body;
    const serviceAccount = JSON.parse(
      process.env.ADMIN as string
    ) as ServiceAccount;
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    }
    const db: any = admin.firestore();
    const users = db.collection(`socialMediaPromotion`);
    const socialMediaDocRef = users.doc(programType);
    socialMediaDocRef
      .get()
      .then((doc: any) => {
        const currentSocialMediaCount = doc.data()[socialMedia];
        if (currentSocialMediaCount !== undefined) {
          const newSocialMediaCount = currentSocialMediaCount + hit;
          const updateObject = {
            [socialMedia]: newSocialMediaCount,
          };
          socialMediaDocRef
            .update(updateObject)
            .then(() => {
              res.status(200).json({ message: "Data updated successfully" });
            })
            .catch(() => {
              res.status(500).json({ error: "Error updating data" });
            });
        } else {
          res.status(400).json({ error: "Invalid social media platform" });
        }
      })
      .catch(() => {
        res.status(500).json({ error: "Error getting document" });
      });
  }
}
