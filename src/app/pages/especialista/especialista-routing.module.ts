import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListagemEspecialistaComponent } from './especialista-list/listagemEspecialista.component';
import { EspecialistaFormComponent } from './especialista-form/especialista-form.component';

const routes: Routes = [
  {path: '',component: ListagemEspecialistaComponent},
  {path: 'especialistas/novo-especialista', component: EspecialistaFormComponent},
  {path: 'especialistas/editar-especialista/:id', component: EspecialistaFormComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EspecialistaRoutingModule { }
