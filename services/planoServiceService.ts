import { PlanoServico } from "@/interfaces/PlanoServico";
import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:3000",
});

export const postPlanoService = async (planoServiceData: PlanoServico) => {
  try {
    const response = await api.post("/plano-services", planoServiceData);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar plano-service:", error);
    throw error;
  }
};
