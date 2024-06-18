import { Especialista } from "../especialista/Especialista";
import { Paciente } from "../paciente/Paciente";
import { Tratamento } from "../tratamento/Tratamento";

export interface Agendamento {
      id:number;
      paciente: Paciente[] | Paciente | number;
      especialista: Especialista[] | Especialista | number;
      tratamento: Tratamento[] | Tratamento | number;
      data: Date;
      hora: Date;
      valor: number;
}
