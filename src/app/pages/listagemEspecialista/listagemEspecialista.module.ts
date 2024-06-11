import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListagemEspecialistaRoutingModule } from './listagemEspecialista-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../../shared/shared.module';
import { ListagemEspecialistaComponent } from './listagemEspecialista.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';


@NgModule({
  declarations: [
    ListagemEspecialistaComponent,
  ],
  imports: [
    CommonModule,
    ListagemEspecialistaRoutingModule,
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
export class ListagemEspecialistaModule { }
