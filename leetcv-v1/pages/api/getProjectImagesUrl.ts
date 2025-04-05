import type { NextApiRequest, NextApiResponse } from "next";
import { ServiceAccount } from "firebase-admin";

type Data = {
  signedUrl: string;
};

var admin = require("firebase-admin");

const serviceAccount = JSON.parse(
  process.env.ADMIN as string
) as ServiceAccount;

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { signedUrl, id, projectId } = req.query;
  const bucket = admin.storage().bucket("gs://leetresume-ind.appspot.com");
  const urlOptions = {
    version: "v4",
    action: "write",
    expires: Date.now() + 1000 * 60 * 2, // 2 minutes
  };

  const [url] = await bucket
    .file(`uploads/${id}/projects/${projectId}/${signedUrl}`)
    .getSignedUrl(urlOptions);

  res.status(200).json({ signedUrl: url });
}
