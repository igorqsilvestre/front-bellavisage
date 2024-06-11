import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListagemAgendamentoRoutingModule } from './listagemAgendamento-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../../shared/shared.module';
import { ListagemAgendamentoComponent } from './listagemAgendamento.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { RatingModule } from 'primeng/rating';


@NgModule({
  declarations: [
    ListagemAgendamentoComponent,
  ],
  imports: [
    CommonModule,
    ListagemAgendamentoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    FontAwesomeModule,
    TableModule,
    InputIconModule,
    IconFieldModule,
    RatingModule

  ]
})
export class ListagemAgendamentoModule { }
