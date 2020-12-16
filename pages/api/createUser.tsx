import { NextApiRequest, NextApiResponse } from "next";
import client from "../../prisma/client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, UserNameLol, uid, email } = req.body;
  try {
    const user = await client.user.create({
      data: { name, UserNameLol, email, uid },
    });
    res.send(user.id);
  } catch (e) {
    console.error(e);

    res.statusCode = 400;
    res.send("");
  }
};
