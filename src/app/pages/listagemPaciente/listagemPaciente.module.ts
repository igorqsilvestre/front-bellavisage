import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListagemPacienteRoutingModule } from './listagemPaciente-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../../shared/shared.module';
import { ListagemPacienteComponent } from './listagemPaciente.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';


@NgModule({
  declarations: [
    ListagemPacienteComponent,
  ],
  imports: [
    CommonModule,
    ListagemPacienteRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    FontAwesomeModule,
    TableModule,
    InputIconModule,
    IconFieldModule,

  ]
})
export class ListagemPacienteModule { }
