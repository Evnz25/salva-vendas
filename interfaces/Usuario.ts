import { Meta } from "./Meta";

export interface Usuario {
  _id?: string;
  nome: string;
  email: string;
  senha: string;
  telefone: string;
  metas?: Meta[];
}
