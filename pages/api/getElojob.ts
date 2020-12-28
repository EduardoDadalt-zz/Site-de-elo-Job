import { NextApiRequest, NextApiResponse } from "next";
import FBAdmin from "../../admin/admin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // const { uid } = await FBAdmin.auth().verifyIdToken(req.body.token);
    const elojob = (
      await FBAdmin.database()
        .ref("elojob")
        .once("value", (e) => e.val())
    ).toJSON();
    res.statusCode = 200;
    res.json(elojob);
  } catch (error) {
    res.statusCode = 400;
    res.end();
  }
}
