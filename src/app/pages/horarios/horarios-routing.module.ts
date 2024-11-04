import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListagemHorarioComponent } from './listagem-horario/listagem-horario.component';
import { HorariosFormComponent } from './horarios-form/horarios-form.component';
import { horariosResolver } from '../../guards/horarios.resolver';


const routes: Routes = [
  {path: '',component: ListagemHorarioComponent},
  {path: 'novos-horarios', component: HorariosFormComponent, resolve: {horarios: horariosResolver}},
  {path: 'editar-horarios/:id', component: HorariosFormComponent, resolve: {horarios: horariosResolver}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HorariosRoutingModule { }
