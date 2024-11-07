import { Component } from '@angular/core';

@Component({
  selector: 'app-listagem-horario',
  templateUrl: './listagem-horario.component.html',
  styleUrl: './listagem-horario.component.css'
})
export class ListagemHorarioComponent {

  tratamentos:string[] = ['Massagem', 'Drenagem linfática', 'Carboxila'];
}
