import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Agendamento } from './Agendamento';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {

  private url = "http://localhost:8081/api/v1/agendamento";

  constructor(private http: HttpClient) { }

  private criarAgendamento(agendamento: Agendamento): Observable<Agendamento>{
    return this.http.post<Agendamento>(this.url, agendamento).pipe(take(1));
  }

  private atualizarAgendamento(agendamento: Agendamento): Observable<Agendamento>{
    return this.http.put<Agendamento>(`${this.url}/${agendamento.id}`, agendamento).pipe(take(1));
  }

  atualizarParteAgendamento(agendamento: Agendamento): Observable<Agendamento>{
    return this.http.patch<Agendamento>(`${this.url}/${agendamento.id}`, agendamento).pipe(take(1));
  }

  existeDataHora(agendamento: Agendamento): Observable<boolean>{
    return this.http.post<boolean>(`${this.url}/exists/dataHora`, agendamento).pipe(take(1));
  }

  obterAgendamentos(): Observable<Agendamento[]>{;
    return this.http.get<Agendamento[]>(this.url).pipe(take(1));
  }

  obterAgendamento(id:number): Observable<Agendamento>{;
    return this.http.get<Agendamento>(`${this.url}/${id}`).pipe(take(1));
  }

  excluirAgendamento(id:number): Observable<Agendamento>{;
    return this.http.delete<Agendamento>(`${this.url}/${id}`).pipe(take(1));
  }

  salvar(agendamento: Agendamento): Observable<Agendamento>{
    if(agendamento.id === null){
      return this.criarAgendamento(agendamento)
    }else{
      return this.atualizarAgendamento(agendamento);
    }
  }
}
