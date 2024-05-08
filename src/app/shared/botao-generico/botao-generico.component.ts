import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-botao-generico',
  templateUrl: './botao-generico.component.html',
  styleUrl: './botao-generico.component.css'
})
export class BotaoGenericoComponent {
@Input() type:string='';
@Input() nome:string='';
}
