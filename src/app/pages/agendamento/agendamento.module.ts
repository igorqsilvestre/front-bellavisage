import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendamentoRoutingModule } from './agendamento-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../../shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { CalendarModule } from 'primeng/calendar';
import { AgendamentoComponent } from './agendamento-form/agendamento.component';
import { ListagemAgendamentoComponent } from './listagemAgendamento/listagemAgendamento.component';
import { RatingModule } from 'primeng/rating';



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
