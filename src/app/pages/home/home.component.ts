import { Tratamento } from '../tratamento/Tratamento';
import { TratamentoService } from './../tratamento/tratamento.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  tratamentos: Tratamento[] = []

  constructor(
    private tratamentoService: TratamentoService
  ){}

  ngOnInit(): void {
   this.atualizarListaDeTratamentos();
  }

  private atualizarListaDeTratamentos() {
   this.tratamentoService.obterTodos().subscribe(
      dados => {
        if(dados){
          this.tratamentos = dados;
        }
      }
    )
  }

  getImageUrl(base64:string, tipoImagem = 'data:image/jpeg;'): string {
    return `${tipoImagem}base64,${base64}`;
  }

}
