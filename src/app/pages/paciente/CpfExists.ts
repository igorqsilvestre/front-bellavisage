import { PacienteService } from '../../pages/paciente/paciente.service';
import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { Observable, catchError, map, of } from "rxjs";
import { Paciente } from './Paciente';

@Injectable()
export class CpfExists implements AsyncValidator{

  constructor(private pacienteService: PacienteService){}

  validate(control: AbstractControl<any, any>):  Observable<ValidationErrors | null> {
    const cpf = control.value;
    const id = control.root.get('id')?.value;//Obtém o ID do formulário
    return this.pacienteService.verificarExisteCPFCadastrado(cpf).pipe(
    map((paciente: Paciente) => {
      return paciente && paciente.id !== id ? { cpfExistente: true } : null;
    }),
    catchError(() => of(null))
  );
  }

}
