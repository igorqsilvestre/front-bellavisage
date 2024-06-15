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
