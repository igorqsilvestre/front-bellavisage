import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EspecialistaRoutingModule } from './especialista-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../../shared/shared.module';
import { EspecialistaComponent } from './especialista.component';


@NgModule({
  declarations: [
    EspecialistaComponent
  ],
  imports: [
    CommonModule,
    EspecialistaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
  ]
})
export class EspecialistaModule { }
