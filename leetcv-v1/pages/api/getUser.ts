// Example of a restricted endpoint that only authenticated users can access from https://next-auth.js.org/getting-started/example

import { Resume } from "data/models/UserInfo";
import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession as getServerSession } from "next-auth";
import admin from "server/router/firebaseAdmin";
import { z } from "zod";
import { authOptions as nextAuthOptions } from "./auth/[...nextauth]";

const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, nextAuthOptions);

  const schema = z.object({
    userId: z.string(),
  });

  if (!session) {
    res.status(400).json({ message: "Cannot get user as unauthenticated" });
  }

  try {
    const data = schema.parse(req.body);
    const db = admin.firestore();

    const userRef = db.collection("users").doc(data.userId);
    const record = await userRef.get();
    if (!record.exists) {
      res.status(404).send({
        message: `user not found`
      });
    }

    if(session?.user?.id !== data.userId) {
      res.status(400).send({
        message: `only the logged in user can access their user information`
      });
    }

    res.status(200).send(record.data() as Resume);
  } catch (e) {
    return res.status(400).send({
      message: `Invalid user id`,
    });
  }
};

export default getUser;
