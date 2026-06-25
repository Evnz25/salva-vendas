import { Meta } from "@/interfaces/Meta";
import api from "./api";

export const postMeta = async (metaData: Meta) => {
  try {
    const response = await api.post("/metas", metaData);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar meta:", error);
    throw error;
  }
};

export const getMetaAtual = async (id: string) => {
  try {
    const response = await api.get(`/usuarios/${id}/meta-atual`);
    return response.data;
  } catch (err) {
    console.error("Erro ao buscar meta atual:", err);
    throw err;
  }
};

export const getHistoricoMetas = async () => {
  try {
    const response = await api.get("/metas/historico");
    return response.data;
  } catch (err) {
    console.error("Erro ao buscar histórico de metas:", err);
    throw err;
  }
};
