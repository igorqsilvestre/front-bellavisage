import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TratamentoRoutingModule } from './tratamento-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../../shared/shared.module';
import { TratamentoFormComponent } from './tratamento-form/tratamento-form.component';
import { ListagemTratamentoComponent } from './tratamento-list/listagemTratamento.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TableModule } from 'primeng/table';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { NomeExists } from './nomeExists';


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
