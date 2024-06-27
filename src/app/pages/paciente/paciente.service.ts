import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Paciente } from './Paciente';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private url = "http://localhost:8081/api/v1/paciente";
  constructor(private http: HttpClient) { }

  private criarPaciente(paciente: Paciente): Observable<Paciente>{
    return this.http.post<Paciente>(this.url, paciente).pipe(take(1));
  }

  private atualizarPaciente(paciente: Paciente): Observable<Paciente>{
    return this.http.put<Paciente>(`${this.url}/${paciente.id}`, paciente).pipe(take(1));
  }

  verificarExisteCPFCadastrado(cpf: string): Observable<Paciente>{;
    return this.http.get<Paciente>(`${this.url}/cpf/${cpf}`).pipe(take(1));
  }

  obterPacientes(): Observable<Paciente[]>{;
    return this.http.get<Paciente[]>(this.url).pipe(take(1));
  }

  obterPaciente(id:number): Observable<Paciente>{;
    return this.http.get<Paciente>(`${this.url}/${id}`).pipe(take(1));
  }

  excluirPaciente(id:number): Observable<Paciente>{;
    return this.http.delete<Paciente>(`${this.url}/${id}`).pipe(take(1));
  }

  salvar(paciente: Paciente): Observable<Paciente>{
    if(paciente.id === null){
      return this.criarPaciente(paciente)
    }else{
      return this.atualizarPaciente(paciente);
    }
  }

}
