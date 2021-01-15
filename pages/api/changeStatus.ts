import { NextApiRequest, NextApiResponse } from "next";
import FBAdmin from "../../admin/admin";
import uidAdmin from "../../config/uidAdmin";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { token, id, value } = req.body;
    const { uid } = await FBAdmin.auth().verifyIdToken(token);
    if (!uidAdmin.includes(uid)) {
      res.statusCode = 401;
      return res.end();
    }
    if (
      await FBAdmin.database()
        .ref("elojob")
        .once("value", (e) => e.hasChild(id))
    ) {
      await FBAdmin.database()
        .ref("elojob")
        .child(id)
        .child("status")
        .set(value);
      res.statusCode = 200;
      return res.send("OK");
    } else {
      res.statusCode = 400;
      return res.end();
    }
  } catch (e) {
    res.statusCode = 400;
    return res.end();
  }
};
