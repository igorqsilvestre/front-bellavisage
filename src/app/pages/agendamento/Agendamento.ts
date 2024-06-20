import { Especialista } from "../especialista/Especialista";
import { Paciente } from "../paciente/Paciente";
import { Tratamento } from "../tratamento/Tratamento";

export interface Agendamento {
      id:number;
      paciente: Paciente[] | Paciente | any;
      especialista: Especialista[] | Especialista | any;
      tratamento: Tratamento[] | Tratamento | any;
      data: string;
      hora: string;
      valor: number;
      status: string;
      avaliacao: number;
}
