import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { AlterarSenhaFormComponent } from './alterar-senha-form/alterar-senha-form.component';
import { LoginComponent } from './login-form/login.component';
import { LoginRoutingModule } from './login-routing.module';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { MessageService } from 'primeng/api';



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
    ToastModule
  ],
  providers: []
})
export class LoginModule { }
