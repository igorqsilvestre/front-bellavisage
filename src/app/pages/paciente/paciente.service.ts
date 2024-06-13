import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Paciente } from './Paciente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private url = "http://localhost:8081/api/v1/paciente";
  constructor(private http: HttpClient) { }

  private criarPaciente(paciente: Paciente): Observable<Paciente>{
    return this.http.post<Paciente>(this.url, paciente);
  }

  private atualizarPaciente(paciente: Paciente): Observable<Paciente>{
    return this.http.put<Paciente>(`${this.url}/${paciente.id}`, paciente);
  }

  verificarExisteCPFCadastrado(cpf: string): Observable<Paciente>{;
    return this.http.get<Paciente>(`${this.url}/cpf/${cpf}`);
  }

  obterPacientes(): Observable<Paciente[]>{;
    return this.http.get<Paciente[]>(this.url);
  }

  obterPaciente(id:number): Observable<Paciente>{;
    return this.http.get<Paciente>(`${this.url}/${id}`);
  }

  excluirPaciente(id:number): Observable<Paciente>{;
    return this.http.delete<Paciente>(`${this.url}/${id}`);
  }

  salvar(paciente: Paciente): Observable<Paciente>{
    if(paciente.id === null){
      return this.criarPaciente(paciente)
    }else{
      return this.atualizarPaciente(paciente);
    }
  }

}
