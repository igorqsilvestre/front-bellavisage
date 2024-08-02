import { NgModule } from '@angular/core';

import { AppAngularModule } from '../../shared/app-angular.module';
import { AppPrimengModule } from '../../shared/app-primeng.module';
import { SharedModule } from '../../shared/shared.module';
import { ListagemPagamentosComponent } from './listagemPagamentos/listagemPagamentos.component';
import { PagamentosRoutingModule } from './pagamentos-routing.module';



@NgModule({
  declarations: [
    ListagemPagamentosComponent,
  ],
  imports: [
    AppAngularModule,
    AppPrimengModule,
    PagamentosRoutingModule,
    SharedModule
  ]
})
export class PagamentosModule { }
