
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { ListagemHorarioComponent } from './listagem-horario/listagem-horario.component';
import { HorariosFormComponent } from './horarios-form/horarios-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HorariosRoutingModule } from './horarios-routing.module';


@NgModule({
  declarations: [
    ListagemHorarioComponent,
    HorariosFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    HorariosRoutingModule

  ]
})
export class HorariosModule { }
