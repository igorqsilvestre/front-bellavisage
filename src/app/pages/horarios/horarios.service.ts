import { Injectable } from '@angular/core';
import { CrudService } from '../../shared/services/crud-service';
import { Horario } from './Horario';
import { HttpClient } from '@angular/common/http';
import { Observable, take } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HorariosService extends CrudService<Horario>{


  private readonly url = "http://localhost:8081/api/v1/horario";

  constructor(protected override http: HttpClient) {
    super(http, "http://localhost:8081/api/v1/horario")

  }

  obterTodosApartirDoEspecialistaEtratamentoEData(idTratamento:number, idEspecialista:number, data:Date ): Observable<Horario[]>{;
    return this.http.get<Horario[]>(`${this.url}/tratamento/${idTratamento}/especialista/${idEspecialista}/data/${data}`).pipe(take(1));
  }

  obterTodosApartirtratamentoEData(idTratamento:number, data:Date ): Observable<Horario[]>{;
    return this.http.get<Horario[]>(`${this.url}/tratamento/${idTratamento}/data/${data}`).pipe(take(1));
  }

}
