import { NextApiRequest, NextApiResponse } from "next";
import { eloETier } from "../../config/eloETier";
import { getPrice } from "../../config/getPrice";
import Admin, { admindatabase } from "../../admin/adminfire";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (VerifiqueTodosOsCampos(req.body)) {
    try {
      //   const { uid } = await Admin.auth().verifyIdToken(req.body.token);
      const {
        modalidade,
        eloAtual,
        eloRequerido,
        partidasAvulsas,
        options,
        filaRanqueada,
      } = req.body.value;
      const precoPorTier = (
        await admindatabase.ref("precoPorTier").once("value", (v) => v.val())
      ).toJSON();
      const precoPorTierDuoBoost = (
        await admindatabase
          .ref("precoPorTierDuoBoost")
          .once("value", (v) => v.val())
      ).toJSON();
      let price = getPrice({
        modalidade,
        eloAtual,
        eloRequerido,
        partidasAvulsas,
        options,
        precoPorTier,
        precoPorTierDuoBoost,
      });

      res.statusCode = 200;
      res.send(price);
    } catch (error) {
      console.error(error);
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
    const {
      modalidade,
      eloAtual,
      eloRequerido,
      partidasAvulsas,
      options,
      filaRanqueada,
    } = value;

    const eloAtualIndex =
      eloAtual && eloAtual.elo && eloAtual.tier
        ? eloETier.findIndex(
            (f) => f.elo === eloAtual.elo && f.tier === eloAtual.tier
          )
        : -1;
    const eloRequeridoIndex =
      eloRequerido && eloRequerido.elo && eloRequerido.tier
        ? eloETier.findIndex(
            (f) => f.elo === eloRequerido.elo && f.tier === eloRequerido.tier
          )
        : -1;
    console.log(
      partidasAvulsas > 0 && partidasAvulsas < 21 && modalidade === 3
    );

    if (
      modalidade > 0 &&
      modalidade < 4 &&
      eloAtualIndex !== -1 &&
      ((eloRequeridoIndex !== -1 &&
        eloAtualIndex < eloRequeridoIndex &&
        modalidade > 0 &&
        modalidade < 3) ||
        (partidasAvulsas > 0 && partidasAvulsas < 21 && modalidade === 3)) &&
      options &&
      filaRanqueada
    ) {
      return true;
    }
  }
  return false;
}
