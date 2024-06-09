import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TratamentoRoutingModule } from './tratamento-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../../shared/shared.module';
import { TratamentoComponent } from './tratamento.component';


@NgModule({
  declarations: [
    TratamentoComponent
  ],
  imports: [
    CommonModule,
    TratamentoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
  ]
})
export class TratamentoModule { }
