import { PagamentoService } from './../pagamento.service';
import { Component, OnInit } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router'; // Import the Router module
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Pagamento } from '../Pagamento';
import { ConfirmModalComponent } from '../../../shared/modals/confirm-modal/confirm-modal.component';
import { AlertModalComponent } from '../../../shared/modals/alert-modal/alert-modal.component';


@Component({
  selector: 'app-listagempagamentos',
  templateUrl: './listagemPagamentos.component.html',
  styleUrl: './listagemPagamentos.component.css'
})
export class ListagemPagamentosComponent implements OnInit{
  pagamentos: Pagamento[] = [];
  faMagnifyingGlass = faMagnifyingGlass;
  faEdit = faEdit;
  faTrash = faTrash;
  modalRef: any;


  constructor(private router: Router,
    private pagamentoService: PagamentoService,
    private modalService: BsModalService
  ) {}


  ngOnInit(): void {
    this.atualizarLista();
  }

  atualizarLista(){
    this.pagamentoService.obterTodos().subscribe(
      dados => {
        if(dados){
          this.pagamentos = dados;
        }
      }
    )
  }

  applyFilterOnTable(event: any, dtListagemPagamentos: any) {
    console.log(event.target.value)
    return dtListagemPagamentos.filterGlobal(event, 'contains')
  }

  editarCadastro(pagamento: Pagamento) {
    this.router.navigate(['pagamentos/editar-pagamento', pagamento.id]);
  }

  cancelarCadastro(pagamento: Pagamento) {

    this.modalRef = this.modalService.show(ConfirmModalComponent, {
      initialState: {
        type: 'Confirmação',
        message: 'Deseja realmente excluir?'
      }
    });

    this.modalRef.content.confirm.subscribe(() => {
      this.pagamentoService.excluir(pagamento.id).subscribe(
        () => {
          this.atualizarLista();
        },
        error => {
          this.modalRef = this.modalService.show(AlertModalComponent, { initialState: { type: 'Erro!', message: 'Erro ao excluir pagamento!' } });
        }
      );
    });

  }

}
