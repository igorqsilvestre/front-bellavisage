import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-campo-formulario-generico',
  templateUrl: './campo-formulario-generico.component.html',
  styleUrl: './campo-formulario-generico.component.css'
})
export class CampoFormularioGenericoComponent {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() type: string = '';
  @Input() mapeamentoLabel:string = '';
}
