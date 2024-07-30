import { NgModule } from '@angular/core';

import { AppAngularModule } from '../../shared/app-angular.module';
import { AppPrimengModule } from '../../shared/app-primeng.module';
import { SharedModule } from '../../shared/shared.module';
import { ListagemTratamentoComponent } from './listagemTratamento/listagemTratamento.component';
import { TratamentoFormComponent } from './tratamento-form/tratamento-form.component';
import { TratamentoRoutingModule } from './tratamento-routing.module';
import { MessageService } from 'primeng/api';



@NgModule({
  declarations: [
    TratamentoFormComponent,
    ListagemTratamentoComponent
  ],
  imports: [
    AppAngularModule,
    AppPrimengModule,
    TratamentoRoutingModule,
    SharedModule,
  ],
  providers:[MessageService]
})
export class TratamentoModule { }
