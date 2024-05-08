import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../../shared/shared.module';
import { AlterarSenhaComponent } from './alterar-senha/alterar-senha.component';



@NgModule({
  declarations: [
    LoginComponent,
    AlterarSenhaComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    LoginComponent,
    AlterarSenhaComponent
  ]
})
export class FeatureLoginModule { }
