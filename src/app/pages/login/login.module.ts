import { CampoControlErroComponent } from './../../shared/campo-control-erro/campo-control-erro.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { SharedModule } from '../../shared/shared.module';
import { AlterarSenhaFormComponent } from './alterar-senha-form/alterar-senha-form.component';
import { LoginRoutingModule } from './login-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { UsuarioEmailValidator } from './usuario-form/UsuarioEmailValidator';
import { LoginEmailValidator } from './LoginEmailValidator';
import { RouterModule } from '@angular/router';



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

  ],
  providers: [UsuarioEmailValidator, LoginEmailValidator]
})
export class LoginModule { }
