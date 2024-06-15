import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardFaturamentoComponent } from './dashboard-faturamento.component';

const routes: Routes = [
  {path: 'dashbord/financeiro', component:DashboardFaturamentoComponent }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardFaturamentoRoutingModule { }
