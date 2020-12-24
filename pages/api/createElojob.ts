import { NextApiRequest, NextApiResponse } from "next";
import FBAdmin from "../../admin/admin";
import { eloETier } from "../../config/eloETier";
import { getPrice } from "../../config/getPrice";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (VerifiqueTodosOsCampos(req.body)) {
    console.log("Entrou 2");
    try {
      let { uid } = await FBAdmin.auth().verifyIdToken(req.body.token);
      const precoPorTier = (
        await FBAdmin.database()
          .ref("precoPorTier")
          .once("value", (v) => v.val())
      ).toJSON();
      const precoPorTierDuoBoost = (
        await FBAdmin.database()
          .ref("precoPorTierDuoBoost")
          .once("value", (v) => v.val())
      ).toJSON();

      let price = getPrice({
        precoPorTierDuoBoost,
        precoPorTier,
        ...req.body.value,
      });
      if (!price) {
        res.statusCode = 400;
        return res.end();
      }
      await FBAdmin.database()
        .ref("elojob/" + uid)
        .set({ ...req.body.value, price });
      const { PasswordLol, UsernameLol, name, whatsapp } = req.body;

      await FBAdmin.database()
        .ref("users/" + uid)
        .set({ PasswordLol, UsernameLol, name, whatsapp });

      res.statusCode = 200;
      return res.send("OK");
    } catch (error) {
      res.statusCode = 400;
      return res.end();
    }
  }
  res.statusCode = 400;
  return res.end();
}
function VerifiqueTodosOsCampos(body: any) {
  const { token, PasswordLol, UsernameLol, name, whatsapp, value } = body;
  if (token && PasswordLol && UsernameLol && name && whatsapp && value) {
    let {
      modalidade,
      eloAtual,
      eloRequerido,
      partidasAvulsas,
      options,
      filaRanqueada,
    } = value;
    console.log("Entrou 1");
    const eloAtualIndex =
      eloAtual && eloAtual.elo && eloAtual.tier
        ? eloETier.findIndex(
            (f) => f.elo === eloAtual.elo && f.tier === eloAtual.tier
          )
        : -1;
    const eloRequeridoIndex =
      eloRequerido &&
      eloRequerido.elo &&
      (eloRequerido.tier === "" || eloRequerido.tier)
        ? eloETier.findIndex(
            (f) => f.elo === eloRequerido.elo && f.tier === eloRequerido.tier
          )
        : -1;

    console.log({ eloAtualIndex, eloRequeridoIndex });

    if (
      modalidade > 0 &&
      modalidade < 4 &&
      eloAtualIndex !== -1 &&
      ((modalidade > 0 &&
        modalidade < 3 &&
        eloRequeridoIndex !== -1 &&
        eloAtualIndex < eloRequeridoIndex) ||
        (modalidade === 3 && partidasAvulsas > 0 && partidasAvulsas < 21)) &&
      options &&
      filaRanqueada
    ) {
      return true;
    }
  }
  return false;
}
