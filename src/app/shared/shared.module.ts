import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CabecalhoComponent } from './cabecalho/cabecalho.component';
import { RodapeComponent } from './rodape/rodape.component';


@NgModule({
  declarations: [
    CabecalhoComponent,
    RodapeComponent,
  ],
  imports: [
    CommonModule
  ],
  exports:[
    CabecalhoComponent,
    RodapeComponent,
  ]
})
export class SharedModule { }
