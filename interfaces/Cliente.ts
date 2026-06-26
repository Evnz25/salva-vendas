import { PlanStatus } from "@/components/ui/planName";

export interface Cliente {
  _id: string;
  nome: string;
  email: string;
  telefone: string;
  status: PlanStatus;
}
