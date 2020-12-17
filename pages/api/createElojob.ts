import { NextApiRequest, NextApiResponse } from "next";
import client from "../../prisma/client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { uid, ...data } = req.body;
  try {
    await client.elojob.create({
      data: { ...data, author: { connect: { uid } } },
    });
    res.statusCode = 200;
    res.send("OK");
  } catch (e) {
    console.error(e);
    res.statusCode = 400;
    res.send("");
  }
};
