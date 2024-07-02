import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Paciente } from './Paciente';
import { Observable, take } from 'rxjs';
import { CrudService } from '../../shared/services/crud-service';

@Injectable({
  providedIn: 'root'
})
export class PacienteService extends CrudService<Paciente>{

  private readonly url = "http://localhost:8081/api/v1/paciente";

  constructor(protected override http: HttpClient) {
    super(http, "http://localhost:8081/api/v1/paciente");
   }


  verificarExisteCPFCadastrado(cpf: string): Observable<Paciente>{;
    return this.http.get<Paciente>(`${this.url}/cpf/${cpf}`).pipe(take(1));
  }
}
