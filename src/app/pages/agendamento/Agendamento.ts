import { Especialista } from "../especialista/Especialista";
import { Paciente } from "../paciente/Paciente";
import { Tratamento } from "../tratamento/Tratamento";
import { Horario } from "../horarios/Horario";

export interface Agendamento {
      id:number;
      paciente: Paciente[] | Paciente | any;
      especialista: Especialista[] | Especialista | any;
      tratamento: Tratamento[] | Tratamento | any;
      horario: Horario[] | Horario | any;
      valor: number;
      status: string;
      avaliacao: number;
}
