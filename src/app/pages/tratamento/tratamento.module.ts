import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TableModule } from 'primeng/table';

import { SharedModule } from '../../shared/shared.module';
import { ListagemTratamentoComponent } from './listagemTratamento/listagemTratamento.component';
import { NomeExists } from './nomeExists';
import { TratamentoFormComponent } from './tratamento-form/tratamento-form.component';
import { TratamentoRoutingModule } from './tratamento-routing.module';



@NgModule({
  declarations: [
    TratamentoFormComponent,
    ListagemTratamentoComponent
  ],
  imports: [
    CommonModule,
    TratamentoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    FontAwesomeModule,
    TableModule,
    InputIconModule,
    IconFieldModule,
  ],
  providers:[NomeExists]
})
export class TratamentoModule { }
