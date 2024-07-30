import { NgModule } from '@angular/core';
import { MessageService } from 'primeng/api';

import { AppAngularModule } from '../../shared/app-angular.module';
import { AppPrimengModule } from '../../shared/app-primeng.module';
import { SharedModule } from '../../shared/shared.module';
import { EspecialistaFormComponent } from './especialista-form/especialista-form.component';
import { EspecialistaRoutingModule } from './especialista-routing.module';
import { ListagemEspecialistaComponent } from './listagemEspecialista/listagemEspecialista.component';


@NgModule({
  declarations: [
    EspecialistaFormComponent,
    ListagemEspecialistaComponent,
  ],
  imports: [
    AppAngularModule,
    AppPrimengModule,
    EspecialistaRoutingModule,
    SharedModule,
  ],
  providers:[MessageService]
})
export class EspecialistaModule { }
