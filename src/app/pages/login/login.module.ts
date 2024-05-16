import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { SharedModule } from '../../shared/shared.module';
import { AlterarSenhaFormComponent } from './alterar-senha-form/alterar-senha-form.component';
import { AdministradorFormComponent } from './administrador-form/administrador-form.component';
import { LoginRoutingModule } from './login-routing.module';



@NgModule({
  declarations: [
    LoginComponent,
    AlterarSenhaFormComponent,
    AdministradorFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }
