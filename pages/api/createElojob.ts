import { NextApiRequest, NextApiResponse } from "next";
import client from "../../prisma/client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, UserNameLol, uid, email } = req.body;
  try {
    await client.elojob.create({ data: {} });
    res.statusCode = 200;
    res.send("OK");
  } catch (e) {
    console.error(e);
    res.statusCode = 400;
    res.send("");
  }
};
