import { Agendamento } from "../agendamento/Agendamento";

export interface Pagamento {
  id:number;
  agendamento: Agendamento[] | Agendamento | any;
  data: string;
  hora: string;
  valor: number;
  formaDePagamento: string;
  statusPagamento?: string;
}
