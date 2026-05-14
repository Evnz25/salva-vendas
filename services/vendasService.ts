import { Venda } from "@/interfaces/Venda";
import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:3000",
});

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
