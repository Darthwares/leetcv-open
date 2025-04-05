import { NextApiRequest, NextApiResponse } from "next";
import * as admin from "firebase-admin";
import { ServiceAccount } from "firebase-admin";

export default async function getUserList(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const serviceAccount = JSON.parse(
    process.env.ADMIN as string
  ) as ServiceAccount;

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
  let db: any = admin.firestore();

  if (!db) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
  if (req.method === "GET") {
    const userHandles = db.collection(`usernames`).limit(1000);
    const snapshot = await userHandles.get();
    const handleList = snapshot.docs.map((doc: { id: string[] }) => doc.id);
    return res.status(200).json({ handleList });
  }
}
