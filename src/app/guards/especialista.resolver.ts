import type { ResolveFn } from '@angular/router';
import { EspecialistaService } from '../pages/especialista/especialista.service';
import { Observable, of } from 'rxjs';
import { Especialista } from '../pages/especialista/Especialista';
import { inject } from '@angular/core';

export const especialistaResolver: ResolveFn<Observable<Especialista>> = (route, state, service: EspecialistaService = inject(EspecialistaService)) => {
  if(route.params?.['id']){
    return service.obter(route.params['id']);
  }
  return of({
    id:null,
    nome:null,
    especialidade:null,
    registro:null,
    email:null,
    telefone:null,
    dataNascimento:null,
    endereco: {
      cep:null,
      logradouro:null,
      bairro:null,
      numero:null,
      complemento:null,
      cidade:null,
      estado:null
    }
  })
};
