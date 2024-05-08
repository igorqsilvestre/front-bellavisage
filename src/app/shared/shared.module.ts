import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BotaoGenericoComponent } from './botao-generico/botao-generico.component';
import { CabecalhoComponent } from './cabecalho/cabecalho.component';
import { RodapeComponent } from './rodape/rodape.component';
import { CampoFormularioGenericoComponent } from './campo-formulario-generico/campo-formulario-generico.component';



@NgModule({
  declarations: [
    CabecalhoComponent,
    RodapeComponent,
    BotaoGenericoComponent,
    CampoFormularioGenericoComponent

  ],
  imports: [
    CommonModule
  ],
  exports:[
    CabecalhoComponent,
    RodapeComponent,
    BotaoGenericoComponent,
    CampoFormularioGenericoComponent

  ]
})
export class SharedModule { }
