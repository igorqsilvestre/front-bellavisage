
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ListagemHorarioComponent } from './listagem-horario/listagem-horario.component';
import { HorariosFormComponent } from './horarios-form/horarios-form.component';
import { HorariosRoutingModule } from './horarios-routing.module';
import { AppPrimengModule } from '../../shared/app-primeng.module';
import { MessageService } from 'primeng/api';
import { AppAngularModule } from '../../shared/app-angular.module';



@NgModule({
  declarations: [
    ListagemHorarioComponent,
    HorariosFormComponent
  ],
  imports: [
    AppAngularModule,
    HorariosRoutingModule,
    AppPrimengModule,
    SharedModule

  ],
  providers:[MessageService]
})
export class HorariosModule { }
