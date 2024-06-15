import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../../shared/shared.module';
import { ListagemPagamentosComponent } from './listagemPagamentos/listagemPagamentos.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { RatingModule } from 'primeng/rating';
import { PagamentosRoutingModule } from './pagamentos-routing.module';



@NgModule({
  declarations: [
    ListagemPagamentosComponent,
  ],
  imports: [
    CommonModule,
    PagamentosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    FontAwesomeModule,
    TableModule,
    InputIconModule,
    IconFieldModule,
    RatingModule

  ]
})
export class PagamentosModule { }
