import { Login } from './../pages/login/Login';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CabecalhoComponent } from './cabecalho/cabecalho.component';
import { RodapeComponent } from './rodape/rodape.component';
import { CampoControlErroComponent } from './campo-control-erro/campo-control-erro.component';
import { DropdownService } from './services/dropdown.service';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { LoginService } from '../pages/login/login.service';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';


@NgModule({
  declarations: [
    CabecalhoComponent,
    RodapeComponent,
    CampoControlErroComponent,
    AlertModalComponent,
    ConfirmModalComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports:[
    CabecalhoComponent,
    RodapeComponent,
    CampoControlErroComponent,
    AlertModalComponent,
    ModalModule,
  ],
  providers:[
    DropdownService,
  ]
})
export class SharedModule { }
