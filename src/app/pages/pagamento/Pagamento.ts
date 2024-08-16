import { Agendamento } from "../agendamento/Agendamento";

export interface Pagamento {
  id:number;
  agendamento: Agendamento[] | Agendamento | any;
  dataHorario: Date;
  valor: number;
  formaDePagamento: string;
  statusPagamento?: string;
}
