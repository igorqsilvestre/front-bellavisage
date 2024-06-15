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

  verificaUsuarioLogado():boolean{
    const usuario = localStorage.getItem('usuarioAutenticado');
     if(usuario !== 'true' || usuario == null){
      return false;
     }else{
      return true;
     }
  }

  deslogar() {
   this.authService.realizarLogin(false);
   this.route.navigate(['']);
  }


}
