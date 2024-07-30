import { inject } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Tratamento } from '../pages/tratamento/Tratamento';
import { TratamentoService } from '../pages/tratamento/tratamento.service';

import type { ResolveFn } from '@angular/router';
export const tratamentoResolver: ResolveFn<Observable<Tratamento>> = (route, state, service: TratamentoService = inject(TratamentoService)) => {
  if(route.params?.['id']){
    return service.obter(route.params['id']);
  }
  return of({
    id:null,
    nome: null,
    valor: null,
    descricao: null,
    imagem: null,
  })
};
