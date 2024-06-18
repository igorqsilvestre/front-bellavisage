import { Component, OnDestroy, OnInit } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router'; // Import the Router module
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCheck, faPen, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Agendamento } from '../Agendamento';
import { Subscription } from 'rxjs';
import { AgendamentoService } from '../agendamento.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmModalComponent } from '../../../shared/confirm-modal/confirm-modal.component';
import { AlertModalComponent } from '../../../shared/alert-modal/alert-modal.component';


@Component({
  selector: 'app-listagemagendamento',
  templateUrl: './listagemAgendamento.component.html',
  styleUrl: './listagemAgendamento.component.css'
})
export class ListagemAgendamentoComponent implements OnInit, OnDestroy{
  agendamentos: Agendamento[] = [];
  agendamentoSubscription: Subscription;
  faMagnifyingGlass = faMagnifyingGlass;
  faEdit = faEdit;
  faTrash = faTrash;
  faPen = faPen;
  faCheck = faCheck;
  faTimes = faTimes;
  modalRef: any;




  constructor(private router: Router,
      private agendamentoService: AgendamentoService,
      private modalService: BsModalService) {}


  ngOnInit(): void {
    this.atualizarLista();
  }

  atualizarLista(){
    this.agendamentoSubscription = this.agendamentoService.obterAgendamentos().subscribe(
      dados => {
        if(dados){
          this.agendamentos = dados;
        }
      }
    )
  }

  /*
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
  ]*/

  applyFilterOnTable(event: any, dtListagemAgendamento: any) {
    console.log(event.target.value)
    return dtListagemAgendamento.filterGlobal(event, 'contains')
  }

  editarCadastro(agendamento: Agendamento) {
    this.router.navigate(['agendamentos/editar-agendamento', agendamento.id])

  }

  cancelarCadastro(agendamento: Agendamento) {

    this.modalRef = this.modalService.show(ConfirmModalComponent, {
      initialState: {
        type: 'Confirmação',
        message: 'Deseja realmente excluir?'
      }
    });

    this.modalRef.content.confirm.subscribe(() => {
      this.agendamentoService.excluirAgendamento(agendamento.id).subscribe(
        () => {
          this.atualizarLista();
        },
        error => {
          this.modalRef = this.modalService.show(AlertModalComponent, { initialState: { type: 'Erro!', message: 'Erro ao excluir agendamento!' } });
        }
      );
    });

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

  ngOnDestroy(): void {
    if(this.agendamentoSubscription){
      this.agendamentoSubscription.unsubscribe();
     }
  }



  }


function onRowEditSave(cadastro: any, any: any) {
  throw new Error('Function not implemented.');
}

function onRowEditInit(cadastro: any, any: any) {
  throw new Error('Function not implemented.');
}

