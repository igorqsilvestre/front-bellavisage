import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListagemPacienteComponent } from './listagemPaciente.component';

const routes: Routes = [
  {path: 'paciente', component: ListagemPacienteComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListagemPacienteRoutingModule { }
