import type { ResolveFn } from '@angular/router';
import { Paciente } from '../pages/paciente/Paciente';
import { Observable, of } from 'rxjs';
import { PacienteService } from '../pages/paciente/paciente.service';
import { inject } from '@angular/core';

export const pacienteResolver: ResolveFn<Observable<Paciente>> = (route, state, service: PacienteService = inject(PacienteService)) => {
  if(route.params?.['id']){
    return service.obter(route.params['id']);
  }
  return of({
    id:null,
    cpf:null,
    nome:null,
    email:null,
    telefone:null,
    endereco: {
      cep:null,
      logradouro:null,
      bairro:null,
      numero:null,
      complemento:null,
      cidade:null,
      estado:null
    }
  });
};
