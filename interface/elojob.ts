interface Elojob {
  eloAtual: Elo;
  modalidade: number | string;
  eloRequerido?: Elo;
  options: object;
  precoPorTier: object;
  precoPorTierDuoBoost: object;
  partidasAvulsas?: number;
}

export interface WithPrices extends Elojob {
  precoPorTier: object;
  precoPorTierDuoBoost: object;
}

export interface Elo {
  tier: string;
  elo: string;
  img: string;
}

export default Elojob;
