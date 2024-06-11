import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListagemEspecialistaComponent } from './listagemEspecialista.component';

const routes: Routes = [
  {path: 'especialista', component: ListagemEspecialistaComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListagemEspecialistaRoutingModule { }
