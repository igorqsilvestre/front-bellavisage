import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from './Usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private urlCadastraUsuario = "http://localhost:8081/api/v1/usuario";

  constructor(private http: HttpClient) { }

  criarUsuario(usuario: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>(this.urlCadastraUsuario, usuario);
  }

}
