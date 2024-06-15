import { Especialista } from './Especialista';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EspecialistaService {

  private url = "http://localhost:8081/api/v1/especialista";
  constructor(private http: HttpClient) { }

  private criarEspecialista(especialista: Especialista): Observable<Especialista>{
    return this.http.post<Especialista>(this.url, especialista);
  }

  private atualizarEspecialista(especialista: Especialista): Observable<Especialista>{
    return this.http.put<Especialista>(`${this.url}/${especialista.id}`, especialista);
  }

  verificarExisteRegistroCadastrado(registro: string): Observable<Especialista>{;
    return this.http.get<Especialista>(`${this.url}/registro/${registro}`);
  }

  obterEspecialistas(): Observable<Especialista[]>{;
    return this.http.get<Especialista[]>(this.url);
  }

  obterEspecialista(id:number): Observable<Especialista>{;
    return this.http.get<Especialista>(`${this.url}/${id}`);
  }

  excluirEspecialista(id:number): Observable<Especialista>{;
    return this.http.delete<Especialista>(`${this.url}/${id}`);
  }

  salvar(especialista: Especialista): Observable<Especialista>{
    if(especialista.id === null){
      return this.criarEspecialista(especialista)
    }else{
      return this.atualizarEspecialista(especialista);
    }
  }
}
