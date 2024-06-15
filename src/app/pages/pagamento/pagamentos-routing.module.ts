import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListagemPagamentosComponent } from './listagemPagamentos/listagemPagamentos.component';

const routes: Routes = [
  {path: '',component: ListagemPagamentosComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagamentosRoutingModule { }
