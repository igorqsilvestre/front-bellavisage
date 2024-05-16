import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { AlterarSenhaFormComponent } from './alterar-senha-form/alterar-senha-form.component';
import { AdministradorFormComponent } from './administrador-form/administrador-form.component';

const routes: Routes = [
  {path: '',component: LoginComponent},
  {path: 'login/alterar-senha', component: AlterarSenhaFormComponent},
  {path: 'login/novo-usuario', component: AdministradorFormComponent}
];

export const LoginRoutingModule = RouterModule.forChild(routes);
