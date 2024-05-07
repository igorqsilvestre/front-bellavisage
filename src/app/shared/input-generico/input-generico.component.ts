import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-generico',
  templateUrl: './input-generico.component.html',
  styleUrl: './input-generico.component.css'
})
export class InputGenericoComponent {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() type: string = '';
}
