import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendamentoRoutingModule } from './agendamento-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../../shared/shared.module';
import { AgendamentoComponent } from './agendamento.component';


@NgModule({
  declarations: [
    AgendamentoComponent
  ],
  imports: [
    CommonModule,
    AgendamentoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
  ]
})
export class AgendamentoModule { }
