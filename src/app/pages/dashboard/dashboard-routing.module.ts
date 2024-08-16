import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FaturamentoComponent } from './dashboard-faturamento/faturamento.component';

const routes: Routes = [
  {path: '', component:FaturamentoComponent },
  {path: 'dashbords/financeiro', component:FaturamentoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
