import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListagemTratamentoComponent } from './listagemTratamento.component';

const routes: Routes = [
  {path: 'tratamento', component: ListagemTratamentoComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListagemTratamentoRoutingModule { }
