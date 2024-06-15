import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EspecialistaRoutingModule } from './especialista-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../../shared/shared.module';
import { InputMaskModule } from 'primeng/inputmask';

import { EspecialistaFormComponent } from './especialista-form/especialista-form.component';
import { ListagemEspecialistaComponent } from './listagemEspecialista/listagemEspecialista.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TableModule } from 'primeng/table';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
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
