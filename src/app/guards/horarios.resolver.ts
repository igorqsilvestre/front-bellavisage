import { inject } from '@angular/core';
import { Observable, of } from 'rxjs';


import type { ResolveFn } from '@angular/router';
import { Horario } from '../pages/horarios/Horario';
import { HorariosService } from '../pages/horarios/horarios.service';

export const horariosResolver: ResolveFn<Observable<Horario>> = (route, state, service: HorariosService = inject(HorariosService)) => {
  if(route.params?.['id']){
    return service.obter(route.params['id']);
  }
  return of({
    id:null,
    especialista: null,
    tratamento: null,
    data: null,
    horarios: null,
})
};
