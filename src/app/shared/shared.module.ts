import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CardModule } from 'primeng/card';

import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { BannerComponent } from './banner/banner.component';
import { CabecalhoComponent } from './cabecalho/cabecalho.component';
import { CampoControlErroTesteComponent } from './campo-control-erro-teste/campo-control-erro-teste.component';
import { CampoControlErroComponent } from './campo-control-erro/campo-control-erro.component';
import { CardComponent } from './card/card.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { CpfPipe } from './pipes/cpf.pipe';
import { TelefonePipe } from './pipes/telefone.pipe';
import { RodapeHomeComponent } from './rodape-home/rodape-home.component';
import { RodapeComponent } from './rodape/rodape.component';
import { DropdownService } from './services/dropdown.service';
import { MessageService } from 'primeng/api';


@NgModule({
  declarations: [
    CabecalhoComponent,
    RodapeComponent,
    BannerComponent,
    CardComponent,
    RodapeHomeComponent,
    CampoControlErroComponent,
    AlertModalComponent,
    ConfirmModalComponent,
    CpfPipe,
    TelefonePipe,
    CampoControlErroTesteComponent

  ],
  imports: [
    CommonModule,
    CardModule,
  ],
  exports:[
    CabecalhoComponent,
    RodapeComponent,
    BannerComponent,
    CardComponent,
    RodapeHomeComponent,
    CampoControlErroComponent,
    CampoControlErroTesteComponent,
    AlertModalComponent,
    ModalModule,
    CpfPipe,
    TelefonePipe
  ],
  providers:[
    DropdownService,
    MessageService
  ]
})
export class SharedModule { }
