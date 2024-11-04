import { Injectable } from '@angular/core';
import { CrudService } from '../../shared/services/crud-service';
import { Horario } from './Horario';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HorariosService extends CrudService<Horario>{

  private readonly url = "http://localhost:8081/api/v1/horario";

  constructor(protected override http: HttpClient) {
    super(http, "http://localhost:8081/api/v1/horario")
  }

}
