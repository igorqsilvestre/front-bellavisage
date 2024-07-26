import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TableModule } from 'primeng/table';

import { SharedModule } from '../../shared/shared.module';
import { CpfExists } from './CpfExists';
import { ListagemPacienteComponent } from './listagemPaciente/listagemPaciente.component';
import { PacienteFormComponent } from './paciente-form/paciente-form.component';
import { PacienteRoutingModule } from './paciente-routing.module';


@NgModule({
  declarations: [
    PacienteFormComponent,
    ListagemPacienteComponent,
  ],
  imports: [
    CommonModule,
    PacienteRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    FontAwesomeModule,
    TableModule,
    InputIconModule,
    IconFieldModule,
  ],
  providers: [CpfExists]
})
export class PacienteModule { }
