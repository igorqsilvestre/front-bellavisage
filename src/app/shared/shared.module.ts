import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AlertModalComponent } from './modals/alert-modal/alert-modal.component';
import { AppPrimengModule } from './app-primeng.module';
import { BannerComponent } from './banner/banner.component';
import { CabecalhoComponent } from './cabecalho/cabecalho.component';
import { CampoControlErroTesteComponent } from './campo-control-erro-teste/campo-control-erro-teste.component';
import { CardComponent } from './card/card.component';
import { ConfirmModalComponent } from './modals/confirm-modal/confirm-modal.component';
import { CpfPipe } from './pipes/cpf.pipe';
import { TelefonePipe } from './pipes/telefone.pipe';
import { RodapeHomeComponent } from './rodape-home/rodape-home.component';
import { RodapeComponent } from './rodape/rodape.component';
import { DropdownService } from './services/dropdown.service';
import { TelefoneMaskDirective } from './directives/telefone-mask.directive';
import { CpfMaskDirective } from './directives/cpf-mask.directive';
import { AddHorarioModalComponent } from './modals/addHorario-modal/addHorario-modal.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CabecalhoComponent,
    RodapeComponent,
    BannerComponent,
    CardComponent,
    RodapeHomeComponent,
    AlertModalComponent,
    ConfirmModalComponent,
    AddHorarioModalComponent,
    CpfPipe,
    TelefonePipe,
    CampoControlErroTesteComponent,
    TelefoneMaskDirective,
    CpfMaskDirective,


  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppPrimengModule,
  ],
  exports:[
    CabecalhoComponent,
    RodapeComponent,
    BannerComponent,
    CardComponent,
    RodapeHomeComponent,
    CampoControlErroTesteComponent,
    AlertModalComponent,
    ModalModule,
    CpfPipe,
    TelefonePipe,
    TelefoneMaskDirective,
    CpfMaskDirective,

  ],
  providers:[
    DropdownService
  ]
})
export class SharedModule { }
