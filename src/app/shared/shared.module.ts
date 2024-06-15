import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CabecalhoComponent } from './cabecalho/cabecalho.component';
import { RodapeComponent } from './rodape/rodape.component';
import { BannerComponent } from './banner/banner.component';
import { CardComponent } from './card/card.component';
import { CardModule } from 'primeng/card';
import { RodapeHomeComponent } from './rodape-home/rodape-home.component';
import { CampoControlErroComponent } from './campo-control-erro/campo-control-erro.component';
import { DropdownService } from './services/dropdown.service';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { CpfPipe } from './pipes/cpf.pipe';
import { TelefonePipe } from './pipes/telefone.pipe';


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
    TelefonePipe

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
    AlertModalComponent,
    ModalModule,
    CpfPipe,
    TelefonePipe
  ],
  providers:[
    DropdownService,
  ]
})
export class SharedModule { }
