import { NgModule } from '@angular/core';
import { MessageService } from 'primeng/api';

import { AppAngularModule } from '../../shared/app-angular.module';
import { AppPrimengModule } from '../../shared/app-primeng.module';
import { SharedModule } from '../../shared/shared.module';
import { ListagemPacienteComponent } from './listagemPaciente/listagemPaciente.component';
import { PacienteFormComponent } from './paciente-form/paciente-form.component';
import { PacienteRoutingModule } from './paciente-routing.module';


@NgModule({
  declarations: [
    PacienteFormComponent,
    ListagemPacienteComponent,
  ],
  imports: [
    AppAngularModule,
    AppPrimengModule,
    PacienteRoutingModule,
    SharedModule
  ],
  providers: [MessageService]
})
export class PacienteModule { }
