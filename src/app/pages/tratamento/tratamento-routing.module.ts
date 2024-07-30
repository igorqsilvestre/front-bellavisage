import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListagemTratamentoComponent } from './listagemTratamento/listagemTratamento.component';
import { TratamentoFormComponent } from './tratamento-form/tratamento-form.component';
import { tratamentoResolver } from '../../guards/tratamento.resolver.';

const routes: Routes = [
  {path: '',component: ListagemTratamentoComponent},
  {path: 'tratamentos/novo-tratamento', component: TratamentoFormComponent, resolve: {tratamento: tratamentoResolver}},
  {path: 'tratamentos/editar-tratamento/:id', component: TratamentoFormComponent, resolve: {tratamento: tratamentoResolver}},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TratamentoRoutingModule { }
