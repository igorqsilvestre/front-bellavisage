import { PacienteService } from '../../pages/paciente/paciente.service';
import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { Observable, map } from "rxjs";

@Injectable()
export class CpfExists implements AsyncValidator{

  constructor(private pacienteService: PacienteService){}

  validate(control: AbstractControl<any, any>):  Observable<ValidationErrors | null> {
    const email = control.value;
    return this.pacienteService.verificarExisteCPFCadastrado(email).pipe(
    map((existe: boolean) => {
      return existe ? { cpfExistente: true } : null;
    }),)
  }

}
