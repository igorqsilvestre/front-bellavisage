import { Especialista } from './Especialista';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { CrudService } from '../../shared/services/crud-service';

@Injectable({
  providedIn: 'root'
})
export class EspecialistaService extends CrudService<Especialista>{

  private readonly url = "http://localhost:8081/api/v1/especialista";
  constructor(protected override http: HttpClient) {
    super(http, "http://localhost:8081/api/v1/especialista")
   }

  verificarExisteRegistroCadastrado(registro: string): Observable<Especialista>{;
    return this.http.get<Especialista>(`${this.url}/registro/${registro}`).pipe(take(1));
  }
}
