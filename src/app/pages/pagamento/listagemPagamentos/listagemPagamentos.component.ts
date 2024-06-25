import { Component } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router'; // Import the Router module
import { faTrash } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-listagempagamentos',
  templateUrl: './listagemPagamentos.component.html',
  styleUrl: './listagemPagamentos.component.css'
})
export class ListagemPagamentosComponent {
  faMagnifyingGlass = faMagnifyingGlass;
  faEdit = faEdit;
  faTrash = faTrash;


  constructor(private router: Router) {} // Add the Router to the component's constructor

  cadastro = [
    {
      id: 1,
      data: '01/05/2024',
      nome: 'Maria Eduarda',
      tratamento: 'Carboxiterapia',
      preco: 150.00,
      formasPagamento: 'Débito',
      status: 'Pago',
      avaliacao:4,
    },
    {
      id: 2,
      data: '03/05/2024',
      nome: 'João Pedro',
      tratamento: 'Criolipólise',
      preco: 150.00,
      formasPagamento: 'Crédito',
      status: 'Pago'
    },
    {
      id: 3,
      data: '10/06/2024',
      nome: 'Jordana Eduarda',
      tratamento: 'Harmonização Facial',
      preco: 1000.00,
      formasPagamento: 'Crédito',
      status: 'Aberto'
    },
    {
      id: 4,
      data: '09/06/2024',
      nome: 'Fernanda Eduarda',
      tratamento: 'Carboxiterapia',
      preco: 150.00,
      formasPagamento: 'Débito',
      status: 'Pago'
    },

  ]

  applyFilterOnTable(event: any, dtListagemPagamentos: any) {
    console.log(event.target.value)
    return dtListagemPagamentos.filterGlobal(event, 'contains')
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

}
