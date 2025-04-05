// Example of a restricted endpoint that only authenticated users can access from https://next-auth.js.org/getting-started/example

import { Resume } from "data/models/UserInfo";
import { NextApiRequest, NextApiResponse } from "next";
import admin from "server/router/firebaseAdmin";
import { z } from "zod";

const getProfileUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const schema = z.object({
    userHandle: z.string(),
  });
  
  try {
    const data = schema.parse(req.body);
    const db = admin.firestore();
    const userRef = db.collection("users").doc(data.userHandle);
    const record = await userRef.get();
    if (!record.exists) {
      res.status(404).send({
        message: `user not found`
      });
    }

    const userInfo: Resume = record.data() as Resume;
    if (userInfo.private) {
      res.status(403).send({
        message: `user is private`
      });
    }

    res.status(200).send(userInfo);
  } catch (e) {
    return res.status(400).send({
      message: `Yo, bad payload!`
    });
  }
};

export default getProfileUser;
