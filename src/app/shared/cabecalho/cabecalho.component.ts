import { Component, Output } from '@angular/core';


@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrl: './cabecalho.component.css'
})
export class CabecalhoComponent {

  @Output() barraNavegacao: boolean = true;

  isLogged() {
    return !!localStorage.getItem('token');
  }


}
