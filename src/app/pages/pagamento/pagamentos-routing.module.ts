import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListagemPagamentosComponent } from './listagemPagamentos/listagemPagamentos.component';
import { pagamentoResolver } from '../../guards/pagamento.resolver';
import { PagamentoFormComponent } from './pagamento-form/pagamento-form.component';

const routes: Routes = [
  {path: '',component: ListagemPagamentosComponent},
  {path: 'novo-pagamento', component: PagamentoFormComponent, resolve: {pagamento: pagamentoResolver}},
  {path: 'editar-pagamento/:id', component: PagamentoFormComponent, resolve: {pagamento: pagamentoResolver}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagamentosRoutingModule { }
