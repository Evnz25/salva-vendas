import { Meta } from "@/interfaces/Meta";
import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:3000",
});

export const postMeta = async (metaData: Meta) => {
  try {
    const response = await api.post("/metas", metaData);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar meta:", error);
    throw error;
  }
};
