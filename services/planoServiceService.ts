import { PlanoServico } from "@/interfaces/PlanoServico";
import api from "./api";

export const postPlanoService = async (planoServiceData: PlanoServico) => {
  try {
    const response = await api.post("/plano-services", planoServiceData);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar plano-service:", error);
    throw error;
  }
};
