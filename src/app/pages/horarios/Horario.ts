import { Especialista } from "../especialista/Especialista";
import { Tratamento } from "../tratamento/Tratamento";

export interface Horario {
  id:number;
  especialista: Especialista[] | Especialista | any;
  tratamento: Tratamento[] | Tratamento | any;
  data: Date;
  horariosEspecialista: Date[];
}
