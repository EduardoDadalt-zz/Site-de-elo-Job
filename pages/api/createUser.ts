import { NextApiRequest, NextApiResponse } from "next";
import fire from "../../config/fire";
import client from "../../prisma/client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {uid,...data} = req.body;
  try {
    
    const user = await client.user.create({ data });
    res.statusCode = 200;
    res.json(user);
  } catch (e) {
    res.statusCode = 400;
    res.send("");
  }
};
