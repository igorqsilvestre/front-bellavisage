import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FaturamentoService {

  private readonly url = "http://localhost:8081/api/v1/pagamento/faturamento/mensal";

  constructor(private http: HttpClient) {}

  obterFaturamentoMensal(tratamentoId: number, mes: number, ano: number): Observable<number> {
    let params = new HttpParams()
      .set('tratamentoId', tratamentoId.toString())
      .set('mes', mes.toString())
      .set('ano', ano.toString());

    return this.http.get<number>(this.url, { params });
  }


}
