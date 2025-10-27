import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

@Input() header!: string;
@Input() imagem!: string;
@Input() descricao!: string;
@Input() valor!: number;
}
