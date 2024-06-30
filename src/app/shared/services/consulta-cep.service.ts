import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultaCepService {

  constructor(private http: HttpClient) { }

  consultaCEP(cep: string): Observable<Cep> {

    // Nova variável "cep" somente com dígitos.
    cep = cep.replace(/\D/g, '');

    // Verifica se campo cep possui valor informado.
    if (cep !== '') {
      // Expressão regular para validar o CEP.
      const validacep = /^[0-9]{8}$/;

      // Valida o formato do CEP.
      if (validacep.test(cep)) {
        return this.http.get<Cep>(`//viacep.com.br/ws/${cep}/json`).pipe(take(1));
      }
    }
    return of({logradouro: null, complemento: null, bairro: null, localidade: null, uf: null});
  }
}

export interface Cep {
  logradouro:string;
  complemento:string;
  bairro:string;
  localidade:string;
  uf: string;
}
