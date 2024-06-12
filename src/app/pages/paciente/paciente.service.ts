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

  criarPaciente(paciente: Paciente): Observable<Paciente>{
    return this.http.post<Paciente>(this.url, paciente);
  }

  verificarExisteCPFCadastrado(cpf: string): Observable<boolean>{;
    return this.http.get<boolean>(`${this.url}/cpf/${cpf}`);
  }

  obterPacientes(): Observable<Paciente>{;
    return this.http.get<Paciente>(this.url);
  }

}
