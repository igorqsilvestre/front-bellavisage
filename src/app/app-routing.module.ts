import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: 'login', loadChildren: () => import('../app/pages/login/login.module').then(m => m.LoginModule)},
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'pacientes', loadChildren: () => import('../app/pages/paciente/paciente.module').then(p => p.PacienteModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
