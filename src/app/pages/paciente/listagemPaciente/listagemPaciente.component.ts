import { PacienteService } from './../paciente.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router'; // Import the Router module
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { Paciente } from '../Paciente';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmModalComponent } from '../../../shared/modals/confirm-modal/confirm-modal.component';
import { AlertModalComponent } from '../../../shared/modals/alert-modal/alert-modal.component';


@Component({
  selector: 'app-listagempaciente',
  templateUrl: './listagemPaciente.component.html',
  styleUrl: './listagemPaciente.component.css'
})
export class ListagemPacienteComponent implements OnInit{
  pacientes: Paciente[] = [];
  modalRef!: BsModalRef;
  faMagnifyingGlass = faMagnifyingGlass;
  faEdit = faEdit;
  faTrash = faTrash;


  constructor(private router: Router,
    private pacienteService: PacienteService,
    private modalService: BsModalService,
  ) {}


  ngOnInit(): void {
    this.atualizarLista();
  }

  atualizarLista(){
    this.pacienteService.obterTodos().subscribe(
      dados => {
        if(dados){
          this.pacientes = dados;
        }
      }
    )
  }


  applyFilterOnTable(event: any, dtListagemPaciente: any) {
    return dtListagemPaciente.filterGlobal(event, 'contains')
  }

  editarCadastro(paciente: Paciente) {
    this.router.navigate(['pacientes/editar-paciente', paciente.id]);
  }

  cancelarCadastro(paciente: Paciente) {
    this.modalRef = this.modalService.show(ConfirmModalComponent, {
      initialState: {
        type: 'Confirmação',
        message: 'Deseja realmente excluir?'
      }
    });

    this.modalRef.content.confirm.subscribe(() => {
      this.pacienteService.excluir(paciente.id).subscribe(
        () => {
          this.atualizarLista();
        },
        error => {
          this.modalRef = this.modalService.show(AlertModalComponent, { initialState: { type: 'Erro!', message: 'Erro ao excluir paciente! Pois ja existe vinculo com agendamento' } });
        }
      );
    });

  }
}
