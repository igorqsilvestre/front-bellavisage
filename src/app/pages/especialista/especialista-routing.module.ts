import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListagemEspecialistaComponent } from './listagemEspecialista/listagemEspecialista.component';
import { EspecialistaFormComponent } from './especialista-form/especialista-form.component';
import { especialistaResolver } from '../../guards/especialista.resolver';

const routes: Routes = [
  {path: '',component: ListagemEspecialistaComponent},
  {path: 'especialistas/novo-especialista', component: EspecialistaFormComponent, resolve: {especialista: especialistaResolver}},
  {path: 'especialistas/editar-especialista/:id', component: EspecialistaFormComponent,  resolve: {especialista: especialistaResolver}},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EspecialistaRoutingModule { }
