import { Especialista } from "../especialista/Especialista";
import { Paciente } from "../paciente/Paciente";
import { Tratamento } from "../tratamento/Tratamento";

export interface Agendamento {
      id:number;
      pacientes: Paciente[];
      especialistas: Especialista[];
      tratamentos: Tratamento[];
      data: Date;
      hora: Date;
      valor: number;
}
