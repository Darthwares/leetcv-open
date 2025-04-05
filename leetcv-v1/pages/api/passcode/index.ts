import { NextApiRequest, NextApiResponse } from "next";
import * as admin from "firebase-admin";
import { ServiceAccount } from "firebase-admin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { currentUID, passcode, requestedHandle } = req.body;

  if (req.method !== "POST") {
    return res.status(400).json({ error: "API supports only POST Method" });
  }
  if (!req.headers.authorization) {
    return res.status(400).json({ error: "Missing Authorization Header" });
  }
  const serviceAccount = JSON.parse(
    process.env.ADMIN as string
  ) as ServiceAccount;

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
  let db: any = admin.firestore();
  const users = db.collection(`users`);

  if (!db) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  users
    .where("handle", "==", requestedHandle)
    .get()
    .then((querySnapshot: any) => {
      querySnapshot.forEach((snap: any) => {
        users
          .doc(snap.data().id)
          .collection(`approvals`)
          .doc(currentUID)
          .get()
          .then((doc: any) => {
            if (passcode === doc.data().passcode) {
              res.status(200).json({
                status: "success",
                data: snap.data(),
                message: "Candidate loaded successfully",
                statusCode: 200,
              });
            }
            if (passcode !== doc.data().passcode) {
              res.status(500).json({
                status: "failed",
                message: "Invalid passcode",
                statusCode: 500,
              });
            }
          });
      });
    });
}
