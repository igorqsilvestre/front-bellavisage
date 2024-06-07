import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { AlterarSenhaFormComponent } from './alterar-senha-form/alterar-senha-form.component';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';

const routes: Routes = [
  {path: '',component: LoginComponent},
  {path: 'login/alterar-senha', component: AlterarSenhaFormComponent},
  {path: 'login/novo-usuario', component: UsuarioFormComponent}
];

export const LoginRoutingModule = RouterModule.forChild(routes);
