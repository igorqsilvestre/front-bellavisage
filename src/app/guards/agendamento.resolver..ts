import { inject } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Agendamento } from '../pages/agendamento/Agendamento';

import type { ResolveFn } from '@angular/router';
import { AgendamentoService } from '../pages/agendamento/agendamento.service';

export const agendamentoResolver: ResolveFn<Observable<Agendamento>> = (route, state, service: AgendamentoService = inject(AgendamentoService)) => {
  if(route.params?.['id']){
    return service.obter(route.params['id']);
  }
  return of({
    id:null,
    paciente: null,
    especialista: null,
    tratamento: null,
    data: null,
    hora: null,
    valor: null,
    status: null,
    avaliacao: null,
})
};
