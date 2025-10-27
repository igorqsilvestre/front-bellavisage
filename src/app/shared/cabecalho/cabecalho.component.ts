import { AuthService } from './../../guards/auth.service';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrl: './cabecalho.component.css'
})
export class CabecalhoComponent {

  @Input() verBarraNavegacao: boolean = true;
  @Input() verLinkEntrar: boolean = true;
  @Input() verLinkSair: boolean = true;

  constructor(private authService:AuthService,private route:Router) { }

  verificaUsuarioLogado(){
    const usuario = this.authService.usuarioEstaAutenticado();
    if(usuario) {
      this.verLinkSair = true;
      return true;
    }else{
      this.verLinkSair = false;
      return false;
    }

  }

  deslogar() {
   this.authService.realizarLogout();
   this.route.navigate(['']);
  }


}
