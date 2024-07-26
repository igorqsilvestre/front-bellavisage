import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-campo-control-erro-teste',
  templateUrl: './campo-control-erro-teste.component.html',
  styleUrl: './campo-control-erro-teste.component.css'
})
export class CampoControlErroTesteComponent {
  @Input() msgErro: string = '';
}
