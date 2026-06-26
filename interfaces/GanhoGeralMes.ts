export interface TipoGanhoGeralMes {
  totalGeral: {
    totalGanhos: number;
    quantidadeVendas: number;
  };
  historicoMensal: TipoHistoricoMensal[];
}

export interface TipoHistoricoMensal {
  _id: {
    ano: number;
    mes: number;
  };
  totalGanhos: number;
  quantidadeVendas: number;
}
