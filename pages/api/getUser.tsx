import { NextApiRequest, NextApiResponse } from "next";
import client from "../../prisma/client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = await client.user.findMany();
    res.json(data);
  } catch (e) {
    console.error(e);
    res.statusCode = 400;
    res.send("");
  }
};
