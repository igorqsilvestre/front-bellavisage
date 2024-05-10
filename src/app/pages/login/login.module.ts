import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { SharedModule } from '../../shared/shared.module';
import { AlterarSenhaFormComponent } from './alterar-senha-form/alterar-senha-form.component';
import { AdministradorFormComponent } from './administrador-form/administrador-form.component';



@NgModule({
  declarations: [
    LoginComponent,
    AlterarSenhaFormComponent,
    AdministradorFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    LoginComponent,
    AlterarSenhaFormComponent,
    AdministradorFormComponent
  ]
})
export class LoginModule { }
