import { NgModule } from '@angular/core';

import { AppAngularModule } from '../../shared/app-angular.module';
import { AppPrimengModule } from '../../shared/app-primeng.module';
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
    AppAngularModule,
    AppPrimengModule,
    AgendamentoRoutingModule,
    SharedModule
  ]
})
export class AgendamentoModule { }
