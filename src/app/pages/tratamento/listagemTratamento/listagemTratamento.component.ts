import { Component, OnDestroy, OnInit } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router'; // Import the Router module
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Tratamento } from '../Tratamento';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TratamentoService } from '../tratamento.service';
import { ConfirmModalComponent } from '../../../shared/modals/confirm-modal/confirm-modal.component';
import { AlertModalComponent } from '../../../shared/modals/alert-modal/alert-modal.component';


@Component({
  selector: 'app-listagemtratamento',
  templateUrl: './listagemTratamento.component.html',
  styleUrl: './listagemTratamento.component.css'
})
export class ListagemTratamentoComponent implements OnInit{
  tratamentos: Tratamento[] = [];
  modalRef!: BsModalRef;
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
  this.tratamentoService.obterTodos().subscribe(
      dados => {
        if(dados){
          this.tratamentos = dados;
        }
      }
    )
  }

  getImageUrl(base64:string, tipoImagem = 'data:image/jpeg;'): string {
    return `${tipoImagem}base64,${base64}`;
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
      this.tratamentoService.excluir(tratamento.id).subscribe(
        () => {
          this.atualizarLista();
        },
        error => {
          this.modalRef = this.modalService.show(AlertModalComponent, { initialState: { type: 'Erro!', message: 'Erro ao excluir tratamento!' } });
        }
      );
    });

  }
}
