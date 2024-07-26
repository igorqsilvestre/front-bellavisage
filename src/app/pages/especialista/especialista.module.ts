import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputMaskModule } from 'primeng/inputmask';
import { TableModule } from 'primeng/table';

import { SharedModule } from '../../shared/shared.module';
import { EspecialistaFormComponent } from './especialista-form/especialista-form.component';
import { EspecialistaRoutingModule } from './especialista-routing.module';
import { ListagemEspecialistaComponent } from './listagemEspecialista/listagemEspecialista.component';
import { RegistroExists } from './registroExists';


@NgModule({
  declarations: [
    EspecialistaFormComponent,
    ListagemEspecialistaComponent,
  ],
  imports: [
    CommonModule,
    EspecialistaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    InputMaskModule,
    FontAwesomeModule,
    TableModule,
    InputIconModule,
    IconFieldModule,
  ],
  providers:[RegistroExists]
})
export class EspecialistaModule { }
