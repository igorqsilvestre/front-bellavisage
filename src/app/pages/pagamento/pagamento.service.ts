import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudService } from '../../shared/services/crud-service';
import { Pagamento } from './Pagamento';

@Injectable({
  providedIn: 'root'
})
export class PagamentoService extends CrudService<Pagamento>{

  private readonly url = "http://localhost:8081/api/v1/pagamento";

  constructor(protected override http: HttpClient) {
    super(http, "http://localhost:8081/api/v1/pagamento");
   }
}
