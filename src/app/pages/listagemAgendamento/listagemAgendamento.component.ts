import { Component } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router'; // Import the Router module
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCheck, faPen, faTimes } from '@fortawesome/free-solid-svg-icons';

import { Time } from '@angular/common';
/* import { Time } from '@angular/common';
 */

/* interface Cadastro {
id: number;
data:Date;
horas: Time;
nome: string;
tratamento:  string;
especialista:  string;
valor: DoubleRange;
status: string;
avaliacao: number;

} */

@Component({
  selector: 'app-listagemagendamento',
  templateUrl: './listagemagendamento.component.html',
  styleUrl: './listagemagendamento.component.css'
})
export class ListagemAgendamentoComponent {
  faMagnifyingGlass = faMagnifyingGlass;
  faEdit = faEdit;
  faTrash = faTrash;
  faPen = faPen;
  faCheck = faCheck;
  faTimes = faTimes;




  constructor(private router: Router) {} // Add the Router to the component's constructor

cadastro=[
    {
      id: 1,
      data:'25/06/2024',
      horas: '14:00',
      nome: 'Maria Eduarda',
      tratamento: 'Carboxiterapia',
      especialista: 'Dr. Margarida Eduarda',
      valor: 120.00,
      status: 'Aberto',
      avaliacao: 3,
    },
    {
      id: 2,
      data:'05/06/2024',
      horas: '16:00',
      nome: 'Carlos Eduardo de Souza',
      tratamento: 'Criolipólise',
      especialista: 'Dr. Paulo Henrique Cabral',
      valor: 120.00,
      status: 'Concluído',
      avaliacao: 4,
    },
    {
      id: 3,
      data:'07/06/2024',
      horas: '14:20',
      nome: 'Márcia Maria de Souza',
      tratamento: 'Drenagem Linfática',
      especialista: 'Dr.Lúcia Lane de Souza',
      valor: 300.00,
      status: 'Concluído',
    },
    {
      id: 4,
      data:'08/06/2024',
      horas: '11:00',
      nome: 'Carlos Eduardo de Souza',
      tratamento: 'carboxiterapia',
      especialista: 'Dr. Paulo Henrique Cabral',
      valor: 120.00,
      status: 'Concluído',
      avaliacao: 4,

    },
    {
      id: 5,
      data:'29/06/2024',
      horas: '15:00',
      nome: 'Flávia Couto Magalhães',
      tratamento: 'Pelling Químico',
      especialista: 'Dr. Margarida Eduarda',
      valor: 200.00,
      status: 'Aberto',
    }
  ]

  applyFilterOnTable(event: any, dtListagemAgendamento: any) {
    console.log(event.target.value)
    return dtListagemAgendamento.filterGlobal(event, 'contains')
  }

  editarCadastro(cadastro: any) {
    this.router.navigate(['/agendar/novo-agendamento'])

  }

  cancelarCadastro(cadastro: any) {

    if(confirm('Deseja realmente excluir o cadastro?')){
      this.cadastro = this.cadastro.filter(item => item.id !== cadastro.id);

      //TODO: Igor, aqui voce implementa a chamada para o backend para excluir o cadastro
    }

  }

  onRowEditInit(cadastro: any) {
    console.log('Row edit initialized');
    //agenda.editing = true;

  }

  onRowEditSave(cadastro: any) {
    console.log('Row edit saved');
    //agenda.editing = false;
    //TODO: chamar o backend para salvar o cadastro
    cadastro.status = 'Concluído';

  }
  onRowEditCancel(cadastro: any) {
    console.log('Row edit cancelled');
    //agenda.editing = false;

  }




  }


function onRowEditSave(cadastro: any, any: any) {
  throw new Error('Function not implemented.');
}

function onRowEditInit(cadastro: any, any: any) {
  throw new Error('Function not implemented.');
}

