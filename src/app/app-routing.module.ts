import { PagamentosModule } from './pages/pagamento/pagamentos.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', loadChildren: () => import('../app/pages/login/login.module').then(m => m.LoginModule)},
  {path: 'pacientes', loadChildren: () => import('../app/pages/paciente/paciente.module').then(p => p.PacienteModule), canActivate: [AuthGuard]},
  {path: 'especialistas', loadChildren: () => import('../app/pages/especialista/especialista.module').then(e => e.EspecialistaModule),canActivate: [AuthGuard]},
  {path: 'tratamentos', loadChildren: () => import('../app/pages/tratamento/tratamento.module').then(t => t.TratamentoModule),canActivate: [AuthGuard]},
  {path: 'agendamentos', loadChildren: () => import('../app/pages/agendamento/agendamento.module').then(a => a.AgendamentoModule),canActivate: [AuthGuard]},
  {path: 'pagamentos', loadChildren: () => import('../app/pages/pagamento/pagamentos.module').then(p => p.PagamentosModule),canActivate: [AuthGuard]},
  {path: 'dashbords', loadChildren: () => import('../app/pages/dashboard/dashboard.module').then(d => d.DashboardModule),canActivate: [AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
