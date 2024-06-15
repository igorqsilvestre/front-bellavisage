import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { EmailValidator, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login-form/login.component';
import { SharedModule } from '../../shared/shared.module';
import { AlterarSenhaFormComponent } from './alterar-senha-form/alterar-senha-form.component';
import { LoginRoutingModule } from './login-routing.module';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { PasswordModule } from 'primeng/password';
import { LoginEmailValidator } from './LoginEmailValidator';
import { UsuarioEmailValidator } from './UsuarioEmailValidator';





@NgModule({
  declarations: [
    LoginComponent,
    AlterarSenhaFormComponent,
    UsuarioFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    SharedModule,
    LoginRoutingModule,
    PasswordModule,
  ],
  providers: [EmailValidator, LoginEmailValidator, UsuarioEmailValidator]
})
export class LoginModule { }
