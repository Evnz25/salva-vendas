import { Meta } from "./Meta";

export type Usuario = {
  _id?: string;
  nome: string;
  email: string;
  telefone: string;
  metas?: Meta[];
};
