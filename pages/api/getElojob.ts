import { NextApiRequest, NextApiResponse } from "next";
import FBAdmin from "../../admin/admin";
import uidAdmin from "../../config/uidAdmin";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { uid } = await FBAdmin.auth().verifyIdToken(String(req.query?.t));
    if (!uidAdmin.includes(uid)) {
      res.statusCode = 401;
      return res.end();
    }

    const elojob = await FBAdmin.database()
      .ref("elojob")
      .once("value", (e) => e.val())
      .then((e) => e.toJSON());
    const users = await FBAdmin.database()
      .ref("users")
      .once("value", (e) => e.val())
      .then((e) => e.toJSON());
    let array = [];
    for (const key in elojob) {
      array.push({ ...elojob[key], user: users[key], key });
    }

    res.statusCode = 200;
    return res.json(array);
  } catch (error) {
    res.statusCode = 500;
    return res.end();
  }
};
