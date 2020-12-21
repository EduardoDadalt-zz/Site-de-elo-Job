interface Elojob {
  eloAtual: Elo;
  modalidade: number;
  eloRequerido?: Elo;
  options: object;
  precoPorTier: object;
  precoPorTierDuoBoost: object;
  partidasAvulsas?: number;
}

interface Elo {
  tier: string;
  elo: string;
  img: string;
}
export default Elojob;
