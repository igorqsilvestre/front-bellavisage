import { EspecialistaService } from './../especialista.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router'; // Import the Router module
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Especialista } from '../Especialista';
import { Subscription } from 'rxjs';
import { ConfirmModalComponent } from '../../../shared/confirm-modal/confirm-modal.component';
import { AlertModalComponent } from '../../../shared/alert-modal/alert-modal.component';


@Component({
  selector: 'app-listagemespecialista',
  templateUrl: './listagemespecialista.component.html',
  styleUrl: './listagemespecialista.component.css'
})
export class ListagemEspecialistaComponent implements OnInit, OnDestroy{
  especialistas: Especialista[] = [];
  modalRef!: BsModalRef;
  especialistaSubscription: Subscription;
  faMagnifyingGlass = faMagnifyingGlass;
  faEdit = faEdit;
  faTrash = faTrash;


  constructor(private router: Router,
    private especialistaService:EspecialistaService,
    private modalService: BsModalService) {}



  ngOnInit(): void {
    this.atualizarLista();
  }

  atualizarLista(){
    this.especialistaSubscription = this.especialistaService.obterEspecialistas().subscribe(
      dados => {
        if(dados){
          this.especialistas = dados;
        }
      }
    )
  }

  /*
  cadastro = [
    {
      id: 1,
      especialista:'Dr. Margarida Eduarda',
      email: "margarida@gmail.com",
      especialidade: 'Biomedicina Estética',
      registro: "CFBM 1234567-8",
      telefone: '(11) 99999-9999',
      endereco: 'Rua dos Bobos, Qd.15',
    },
    {
      id: 2,
      especialista: 'Dr. Paulo Henrique Cabral',
      email: "ph@gmail.com",
      especialidade: 'Biomedicina Estética',
      registro: "CFBM 1234567-9",
      telefone: '(11) 99999-8888',
      endereco: 'Rua São Paulo, Qd.19',
    },
    {
      id: 3,
      especialista: 'Dr.Lúcia Lane de Souza',
      email: "margarida@gmail.com",
      especialidade: 'Biomedicina Estética',
      registro: "CFBM 1234567-3",
      telefone: '(11) 99999-7777',
      endereco: 'Rua Bahia, Qd.15',

    },
    {
      id: 4,
      especialista: 'Dr.Joana Joanes de Souza',
      email: "margarida@gmail.com",
      especialidade: 'Biomedicina Estética',
      registro: "CFBM 1234567-0",
      telefone: '(11) 99999-3333',
      endereco: 'Rua Sergipe, Qd.19',
    },
    {
      id: 5,
      especialista: 'Dr. Margarida Eduarda',
      email: "margarida@gmail.com",
      especialidade: 'Biomedicina Estética',
      registro: "CFBM 1234567-8",
      telefone: '(11) 99999-9999',
      endereco: 'Rua dos Bobos, Qd.12',
    }
  ]*/

  applyFilterOnTable(event: any, dtListagemEspecialista: any) {
    return dtListagemEspecialista.filterGlobal(event, 'contains')
  }

  editarCadastro(especialista: Especialista) {
    this.router.navigate(['especialistas/editar-especialista', especialista.id]);
  }

  cancelarCadastro(especialista: Especialista) {

    this.modalRef = this.modalService.show(ConfirmModalComponent, {
      initialState: {
        type: 'Confirmação',
        message: 'Deseja realmente excluir?'
      }
    });

    this.modalRef.content.confirm.subscribe(() => {
      this.especialistaService.excluirEspecialista(especialista.id).subscribe(
        () => {
          this.atualizarLista();
        },
        error => {
          this.modalRef = this.modalService.show(AlertModalComponent, { initialState: { type: 'Erro!', message: 'Erro ao excluir especialista!' } });
        }
      );
    });

  }

  ngOnDestroy(): void {
    if(this.especialistaSubscription){
      this.especialistaSubscription.unsubscribe();
     }
  }

}
