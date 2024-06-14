
import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { Observable, catchError, map, of } from "rxjs";
import { EspecialistaService } from './especialista.service';
import { Especialista } from './Especialista';

@Injectable()
export class RegistroExists implements AsyncValidator{

  constructor(private especialistaService: EspecialistaService){}

  validate(control: AbstractControl<any, any>):  Observable<ValidationErrors | null> {
    const registro = control.value;
    const id = control.root.get('id')?.value;//Obtém o ID do formulário
    return this.especialistaService.verificarExisteRegistroCadastrado(registro).pipe(
    map((especialista: Especialista) => {
      return especialista && especialista.id !== id ? { registroExistente: true } : null;
    }),
    catchError(() => of(null))
  );
  }

}
