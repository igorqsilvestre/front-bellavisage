import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PacienteFormComponent } from './paciente-form/paciente-form.component';
import { ListagemPacienteComponent } from './paciente-list/listagemPaciente.component';

const routes: Routes = [
  {path: '',component: ListagemPacienteComponent},
  {path: 'pacientes/novo-paciente', component: PacienteFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacienteRoutingModule { }
