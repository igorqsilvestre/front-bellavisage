import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tratamento } from './Tratamento';
import { Observable, take } from 'rxjs';
import { CrudService } from '../../shared/services/crud-service';

@Injectable({
  providedIn: 'root'
})
export class TratamentoService extends CrudService<Tratamento>{

  private readonly url = "http://localhost:8081/api/v1/tratamento";

  constructor(protected override http: HttpClient) {
    super(http, "http://localhost:8081/api/v1/tratamento");
  }

  verificarExisteNomeCadastrado(nome: string): Observable<Tratamento>{;
    return this.http.get<Tratamento>(`${this.url}/nome/${nome}`).pipe(take(1));
  }
}
