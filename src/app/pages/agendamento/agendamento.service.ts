import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Agendamento } from './Agendamento';
import { CrudService } from '../../shared/services/crud-service';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService extends CrudService<Agendamento>{

  private readonly url = "http://localhost:8081/api/v1/agendamento";

  constructor(protected override http: HttpClient) {
    super(http, "http://localhost:8081/api/v1/agendamento")
  }

  atualizarParteAgendamento(agendamento: Agendamento): Observable<Agendamento>{
    return this.http.patch<Agendamento>(`${this.url}/${agendamento.id}`, agendamento).pipe(take(1));
  }

  existeDataHora(agendamento: Agendamento): Observable<boolean>{
    return this.http.post<boolean>(`${this.url}/exists/dataHora`, agendamento).pipe(take(1));
  }

}
