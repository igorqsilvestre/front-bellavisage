import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListagemAgendamentoComponent } from './listagemAgendamento.component';

const routes: Routes = [
  {path: 'agendamento', component: ListagemAgendamentoComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListagemAgendamentoRoutingModule { }
