import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListagemTratamentoComponent } from './listagemTratamento/listagemTratamento.component';
import { TratamentoFormComponent } from './tratamento-form/tratamento-form.component';

const routes: Routes = [
  {path: '',component: ListagemTratamentoComponent},
  {path: 'tratamentos/novo-tratamento', component: TratamentoFormComponent},
  {path: 'tratamentos/editar-tratamento/:id', component: TratamentoFormComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TratamentoRoutingModule { }
