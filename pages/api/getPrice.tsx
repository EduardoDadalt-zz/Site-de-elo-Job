import { NextApiRequest, NextApiResponse } from "next";
import fire from "../../config/fire";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.statusCode = 200;
  let obj = {};
  //   , "precoPorTierDuoBoost"
  obj["precoPorTier"] = (
    await fire
      .database()
      .ref("precoPorTier")
      .once("value", (v) => v.val())
  ).toJSON();
  obj["precoPorTierDuoBoost"] = (
    await fire
      .database()
      .ref("precoPorTierDuoBoost")
      .once("value", (v) => v.val())
  ).toJSON();

  res.json(obj);
}
