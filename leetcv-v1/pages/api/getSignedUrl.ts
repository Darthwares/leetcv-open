// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ServiceAccount } from "firebase-admin";

type Data = {
  signedUrl: string;
};

let admin = require("firebase-admin");

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
  const { signedUrl, id } = req.query;
  const bucket = admin.storage().bucket(process.env.NEXT_BUCKET_URL);
  const urlOptions = {
    version: "v4",
    action: "write",
    expires: Date.now() + 1000 * 60 * 2,
  };

  const [url] = await bucket
    .file(`uploads/${id}/${signedUrl}`)
    .getSignedUrl(urlOptions);

  res.status(200).json({ signedUrl: url });
}
