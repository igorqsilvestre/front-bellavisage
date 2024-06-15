import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendamentoComponent } from './agendamento-form/agendamento.component';
import { ListagemAgendamentoComponent } from './listagemAgendamento/listagemAgendamento.component';


const routes: Routes = [
  {path: '',component: ListagemAgendamentoComponent},
  {path: 'agendamentos/novo-agendamento', component: AgendamentoComponent},
  {path: 'agendamentos/editar-agendamento/:id', component: AgendamentoComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgendamentoRoutingModule { }
