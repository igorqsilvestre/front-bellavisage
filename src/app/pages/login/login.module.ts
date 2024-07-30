import { NgModule } from '@angular/core';
import { MessageService } from 'primeng/api';

import { AppAngularModule } from '../../shared/app-angular.module';
import { AppPrimengModule } from '../../shared/app-primeng.module';
import { SharedModule } from '../../shared/shared.module';
import { AlterarSenhaFormComponent } from './alterar-senha-form/alterar-senha-form.component';
import { LoginComponent } from './login-form/login.component';
import { LoginRoutingModule } from './login-routing.module';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';




@NgModule({
  declarations: [
    LoginComponent,
    AlterarSenhaFormComponent,
    UsuarioFormComponent,
  ],
  imports: [
    AppAngularModule,
    AppPrimengModule,
    SharedModule,
    LoginRoutingModule,
  ],
  providers: [MessageService]
})
export class LoginModule { }
