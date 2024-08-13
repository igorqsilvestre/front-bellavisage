import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PacienteFormComponent } from './paciente-form/paciente-form.component';
import { ListagemPacienteComponent } from './listagemPaciente/listagemPaciente.component';
import { pacienteResolver } from '../../guards/paciente.resolver';


const routes: Routes = [
  {path: '',component: ListagemPacienteComponent},
  {path: 'novo-paciente', component: PacienteFormComponent, resolve: {paciente: pacienteResolver}},
  {path: 'editar-paciente/:id', component: PacienteFormComponent, resolve: { paciente: pacienteResolver}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacienteRoutingModule { }
