
import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { Observable, catchError, map, of } from "rxjs";
import { TratamentoService } from "./tratamento.service";
import { Tratamento } from "./Tratamento";

@Injectable()
export class NomeExists implements AsyncValidator{

  constructor(private tratamentoService: TratamentoService){}

  validate(control: AbstractControl<any, any>):  Observable<ValidationErrors | null> {
    const registro = control.value;
    const id = control.root.get('id')?.value;//Obtém o ID do formulário
    return this.tratamentoService.verificarExisteNomeCadastrado(registro).pipe(
    map((tratamento: Tratamento) => {
      return tratamento && tratamento.id !== id ? { nomeExistente: true } : null;
    }),
    catchError(() => of(null))
  );
  }

}
