import { inject } from '@angular/core';
import { Observable, of } from 'rxjs';

import { AgendamentoService } from '../pages/agendamento/agendamento.service';
import { Pagamento } from '../pages/pagamento/Pagamento';

import type { ResolveFn } from '@angular/router';
import { PagamentoService } from '../pages/pagamento/pagamento.service';
export const pagamentoResolver: ResolveFn<Observable<Pagamento>> = (route, state, service: PagamentoService = inject(PagamentoService)) => {

  if(route.params?.['id']){
    return service.obter(route.params['id']);
  }
  return of({
    id:null,
    agendamento:null,
    data: null,
    hora: null,
    valor: null,
    formaDePagamento: null
  })
};
