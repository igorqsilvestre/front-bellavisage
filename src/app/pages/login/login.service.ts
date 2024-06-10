import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from './Usuario';
import { Login } from './Login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url = "http://localhost:8081/api/v1/usuario";

  constructor(private http: HttpClient) { }

  criarUsuario(usuario: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>(this.url, usuario);
  }

  atualizarSenha(login: Login): Observable<Login>{;
    return this.http.patch<Login>(`${this.url}/email`, login);
  }

  verificarExisteEmailCadastrado(email: string): Observable<boolean>{;
    return this.http.get<boolean>(`${this.url}/email?email=${email}`);
  }

}
