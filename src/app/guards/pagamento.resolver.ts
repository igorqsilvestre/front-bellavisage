import { inject } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Pagamento } from '../pages/pagamento/Pagamento';

import type { ResolveFn } from '@angular/router';
import { PagamentoService } from '../pages/pagamento/pagamento.service';
export const pagamentoResolver: ResolveFn<Observable<Pagamento>> = (route, state, service: PagamentoService = inject(PagamentoService)) => {

  if(route.params?.['id']){
    return service.obter(route.params['id']);
  }
  return of({
    id: null,
    agendamento: null,
    dataHorario: null,
    valor: null,
    formaDePagamento: null
  })
};
