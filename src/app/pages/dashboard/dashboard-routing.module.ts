import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardFaturamentoComponent } from './dashboard-faturamento/dashboard-faturamento.component';

const routes: Routes = [
  {path: '', component:DashboardFaturamentoComponent },
  {path: 'dashbords/financeiro', component:DashboardFaturamentoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
