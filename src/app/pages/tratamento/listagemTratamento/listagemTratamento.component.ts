import { Component, OnDestroy, OnInit } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router'; // Import the Router module
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Tratamento } from '../Tratamento';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TratamentoService } from '../tratamento.service';
import { Subscription } from 'rxjs';
import { ConfirmModalComponent } from '../../../shared/confirm-modal/confirm-modal.component';
import { AlertModalComponent } from '../../../shared/alert-modal/alert-modal.component';


@Component({
  selector: 'app-listagemtratamento',
  templateUrl: './listagemTratamento.component.html',
  styleUrl: './listagemTratamento.component.css'
})
export class ListagemTratamentoComponent implements OnInit, OnDestroy{
  tratamentos: Tratamento[] = [];
  modalRef!: BsModalRef;
  tratamentoSubscription: Subscription;
  faMagnifyingGlass = faMagnifyingGlass;
  faEdit = faEdit;
  faTrash = faTrash;


  constructor(private router: Router,
    private tratamentoService: TratamentoService,
    private modalService: BsModalService
  ) {}



  ngOnInit(): void {
    this.atualizarLista();
  }

  atualizarLista(){
    this.tratamentoSubscription = this.tratamentoService.obterTratamentos().subscribe(
      dados => {
        if(dados){
          this.tratamentos = dados;
        }
      }
    )
  }


  applyFilterOnTable(event: any, dtListagemTratamento: any) {
    console.log(event.target.value)
    return dtListagemTratamento.filterGlobal(event, 'contains')
  }

  editarCadastro(tratamento: Tratamento) {
    this.router.navigate(['tratamentos/editar-tratamento', tratamento.id]);
  }

  cancelarCadastro(tratamento: Tratamento) {

    this.modalRef = this.modalService.show(ConfirmModalComponent, {
      initialState: {
        type: 'Confirmação',
        message: 'Deseja realmente excluir?'
      }
    });

    this.modalRef.content.confirm.subscribe(() => {
      this.tratamentoService.excluirTratamento(tratamento.id).subscribe(
        () => {
          this.atualizarLista();
        },
        error => {
          this.modalRef = this.modalService.show(AlertModalComponent, { initialState: { type: 'Erro!', message: 'Erro ao excluir tratamento!' } });
        }
      );
    });

  }

  ngOnDestroy(): void {
    if(this.tratamentoSubscription){
      this.tratamentoSubscription.unsubscribe();
     }
  }

}
