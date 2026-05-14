import { Cliente } from "@/interfaces/Cliente";
import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:3000",
});

export const postCliente = async (clienteData: Cliente) => {
  try {
    const response = await api.post("/clientes", clienteData);
    return response.data;
  } catch (err) {
    console.error("Erro ao cadastrar cliente", err);
    throw err;
  }
};
