import { Routes, RouterModule } from '@angular/router';

import { AlterarSenhaFormComponent } from './alterar-senha-form/alterar-senha-form.component';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { LoginComponent } from './login-form/login.component';

const routes: Routes = [
  {path: 'login',component: LoginComponent},
  {path: 'login/alterar-senha', component: AlterarSenhaFormComponent},
  {path: 'login/novo-usuario', component: UsuarioFormComponent}
];

export const LoginRoutingModule = RouterModule.forChild(routes);
