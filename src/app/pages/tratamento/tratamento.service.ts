import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tratamento } from './Tratamento';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TratamentoService {

  private url = "http://localhost:8081/api/v1/tratamento";
  constructor(private http: HttpClient) { }

  private criarTratamento(tratamento: Tratamento): Observable<Tratamento>{
    return this.http.post<Tratamento>(this.url, tratamento).pipe(take(1));
  }

  private atualizarTratamento(tratamento: Tratamento): Observable<Tratamento>{
    return this.http.put<Tratamento>(`${this.url}/${tratamento.id}`, tratamento).pipe(take(1));
  }

  verificarExisteNomeCadastrado(nome: string): Observable<Tratamento>{;
    return this.http.get<Tratamento>(`${this.url}/nome/${nome}`).pipe(take(1));
  }

  obterTratamentos(): Observable<Tratamento[]>{;
    return this.http.get<Tratamento[]>(this.url).pipe(take(1));
  }

  obterTratamento(id:number): Observable<Tratamento>{;
    return this.http.get<Tratamento>(`${this.url}/${id}`).pipe(take(1));
  }

  excluirTratamento(id:number): Observable<Tratamento>{;
    return this.http.delete<Tratamento>(`${this.url}/${id}`).pipe(take(1));
  }

  salvar(tratamento: Tratamento): Observable<Tratamento>{
    if(tratamento.id === null){
      return this.criarTratamento(tratamento)
    }else{
      return this.atualizarTratamento(tratamento);
    }
  }
}
