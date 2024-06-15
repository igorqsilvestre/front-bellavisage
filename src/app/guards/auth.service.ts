import { Injectable, OnDestroy } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  private usuarioAutenticado: boolean = false;

  constructor() {
    this.usuarioAutenticado = localStorage.getItem('usuarioAutenticado') === 'true';
  }

  realizarLogin(usuarioEstaLogado: boolean) {
    this.usuarioAutenticado = usuarioEstaLogado;
    localStorage.setItem('usuarioAutenticado', usuarioEstaLogado.toString());
  }

  usuarioEstaAutenticado() {
    return this.usuarioAutenticado;
  }
}
