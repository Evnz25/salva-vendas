import { Venda } from "@/interfaces/Venda";
import api from "./api";

export const postVenda = async (vendaData: Venda) => {
  try {
    const response = await api.post("/vendas", vendaData);
    return response.data;
  } catch (err) {
    console.error("Erro ao cadastrar venda", err);
    throw err;
  }
};

export const getGanhoMes = async () => {
  try {
    const response = await api.get("/ganhos-mes");
    return response.data;
  } catch (err) {
    console.error("Erro ao consultar ganho-mes: ", err);
    throw err;
  }
};

export const getGanhoGeralMes = async () => {
  console.log("CHEGOU A REQUISIÇÃO NO NODE. BUSCANDO NO BANCO...");

  try {
    const response = await api.get("/ganhos-geral-e-por-mes");
    return response.data;
  } catch (err) {
    console.error("Erro ao consultar ganhos-geral-e-por-mes: ", err);
    throw err;
  }
};
