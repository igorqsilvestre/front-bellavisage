import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CabecalhoComponent } from './cabecalho/cabecalho.component';
import { RodapeComponent } from './rodape/rodape.component';
import { CampoControlErroComponent } from './campo-control-erro/campo-control-erro.component';
import { DropdownService } from './services/dropdown.service';


@NgModule({
  declarations: [
    CabecalhoComponent,
    RodapeComponent,
    CampoControlErroComponent,
  ],
  imports: [
    CommonModule
  ],
  exports:[
    CabecalhoComponent,
    RodapeComponent,
    CampoControlErroComponent,
  ],
  providers:[
    DropdownService
  ]
})
export class SharedModule { }
