import { eloETier } from "./eloETier";

const fraseInicialEloAtual = "Selecione seu Elo",
  fraseInicialEloRequerido = "Selecione o Elo do Sonho";
import { WithPrices } from "../interface/elojob";
interface getPriceObj {
  (obj: WithPrices): number;
}
export const getPrice: getPriceObj = ({
  eloAtual,
  modalidade,
  eloRequerido,
  options,
  precoPorTier,
  precoPorTierDuoBoost,
  partidasAvulsas,
}) => {
  let price = 0;
  const eloAtualIndex = eloETier.findIndex(
    (f) => f.elo == eloAtual.elo && f.tier == eloAtual.tier
  );
  if (eloAtualIndex !== -1 && (modalidade == 1 || modalidade == 2)) {
    const eloRequeridoIndex = eloETier.findIndex(
      (f) => f.elo == eloRequerido.elo && f.tier == eloRequerido.tier
    );

    for (let x = eloAtualIndex; x < eloRequeridoIndex; x++) {
      let partidas = 7.5;
      let multipli = SelecionarPorElo(
        eloETier[x],
        modalidade == 1 ? precoPorTier : precoPorTierDuoBoost
      );

      if (eloETier[x].tier == 1) {
        partidas += 1;
      }
      multipli /= partidas;
      price += partidas * multipli;
    }
  } else if (eloAtualIndex !== -1 && modalidade == 3) {
    let multipli = SelecionarPorElo(eloETier[eloAtualIndex], precoPorTier);
    price = partidasAvulsas * (multipli / 4);
  }
  if (options["Selecionar a Rota (+20%)"]) {
    price *= 1.2;
  }
  if (options["Selecionar o Campeão (+20%)"]) {
    price *= 1.2;
  }
  if (options["Definir os Horários (+10%)"]) {
    price *= 1.1;
  }
  if (options["Estou recebendo menos de 15 de PDL (+40%)"]) {
    price *= 1.4;
  }

  return Math.ceil(price);
};
function SelecionarPorElo(eloetier, elos) {
  let result;
  switch (eloetier.elo) {
    case "Ferro":
      result = elos.ferro;
      break;
    case "Bronze":
      result = elos.bronze;
      break;
    case "Prata":
      result = elos.prata;
      break;
    case "Ouro":
      result = elos.ouro;
      break;
    case "Platina":
      result = elos.platina;
      break;
    case "Diamante":
      if (elos.diamante)
        switch (eloetier.tier) {
          case 4:
            result = elos.diamante[4];
            break;
          case 3:
            result = elos.diamante[3];
            break;
          case 2:
            result = elos.diamante[2];
            break;
          case 1:
            result = elos.diamante[1];
            break;
          default:
            break;
        }
      break;
    default:
      result = 1;
      break;
  }
  return result;
}
