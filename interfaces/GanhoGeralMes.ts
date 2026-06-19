export type TipoGanhoGeralMes = {
  totalGeral: {
    totalGanhos: number;
    quantidadeVendas: number;
  };
  historicoMensal: TipoHistoricoMensal[];
};

export type TipoHistoricoMensal = {
  _id: {
    ano: number;
    mes: number;
  };
  totalGanhos: number;
  quantidadeVendas: number;
};
