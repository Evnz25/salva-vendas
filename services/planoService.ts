import { Plano } from "@/interfaces/Plano";
import api from "./api";

export const postPlano = async (planoData: Plano) => {
  try {
    const response = await api.post("/planos", planoData);
    return response.data;
  } catch (err) {
    console.error("Erro ao criar plano:", err);
    throw err;
  }
};

export const putPlano = async (planoData: Plano) => {
  try {
    const response = await api.put(`/planos/${planoData._id}`, planoData);
    return response.data;
  } catch (err) {
    console.error("Erro ao atualizar o plano");
    throw err;
  }
};

export const deletePlano = async (id: String) => {
  try {
    const response = await api.delete(`/planos/${id}`);
    return response;
  } catch (err) {
    console.error("Erro ao deletar o planos", err);
    throw err;
  }
};

export const getPlanos = async () => {
  try {
    const response = await api.get("/planos");
    return response.data;
  } catch (err) {
    console.error("Erro ao consultar todos os clientes: ", err);
    throw err;
  }
};
