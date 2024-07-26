import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CalendarModule } from 'primeng/calendar';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { RatingModule } from 'primeng/rating';
import { TableModule } from 'primeng/table';

import { SharedModule } from '../../shared/shared.module';
import { AgendamentoComponent } from './agendamento-form/agendamento.component';
import { AgendamentoRoutingModule } from './agendamento-routing.module';
import { ListagemAgendamentoComponent } from './listagemAgendamento/listagemAgendamento.component';



@NgModule({
  declarations: [
    AgendamentoComponent,
    ListagemAgendamentoComponent
  ],
  imports: [
    CommonModule,
    AgendamentoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    FontAwesomeModule,
    TableModule,
    InputIconModule,
    IconFieldModule,
    CalendarModule,
    RatingModule
  ]
})
export class AgendamentoModule { }
