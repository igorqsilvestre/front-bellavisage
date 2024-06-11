import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TratamentoComponent } from './tratamento.component';

const routes: Routes = [
  {path: 'tratamento/novo-tratamento', component: TratamentoComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TratamentoRoutingModule { }
