import { Component, OnDestroy, OnInit } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router'; // Import the Router module
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCheck, faPen, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Agendamento } from '../Agendamento';
import { AgendamentoService } from '../agendamento.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmModalComponent } from '../../../shared/confirm-modal/confirm-modal.component';
import { AlertModalComponent } from '../../../shared/alert-modal/alert-modal.component';


@Component({
  selector: 'app-listagemagendamento',
  templateUrl: './listagemAgendamento.component.html',
  styleUrl: './listagemAgendamento.component.css'
})
export class ListagemAgendamentoComponent implements OnInit{
  agendamentos: Agendamento[] = [];
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
    this.agendamentoService.obterTodos().subscribe(
      dados => {
        if(dados){
          this.agendamentos = dados;
        }
      }
    )
  }


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
      this.agendamentoService.excluir(agendamento.id).subscribe(
        () => {
          this.atualizarLista();
        },
        error => {
          this.modalRef = this.modalService.show(AlertModalComponent, { initialState: { type: 'Erro!', message: 'Erro ao excluir agendamento!' } });
        }
      );
    });

  }

  onRowEditInit(agendamento: Agendamento) {
    console.log('Row edit initialized');
    //agenda.editing = true;

  }

  onRowEditSave(agendamento: Agendamento) {
    console.log('Row edit saved');
    agendamento.status = 'Concluido';
    this.agendamentoService.atualizarParteAgendamento(agendamento).subscribe();
    this.router.navigate(['agendamentos']);
  }
  onRowEditCancel(agendamento: Agendamento) {
    console.log('Row edit cancelled');
    //agenda.editing = false;

  }
}




