import { LoginService } from './../pages/login/login.service';
import { Injectable, OnDestroy } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  private usuarioAutenticado: boolean = false;

  constructor() { }

  realizarLogin(usuarioEstaLogado: boolean){
   if(usuarioEstaLogado){
    this.usuarioAutenticado = true;
   }else{
    this.usuarioAutenticado = false;
   }
  }

  usuarioEstaAutenticado(){
    return this.usuarioAutenticado;
  }
}
