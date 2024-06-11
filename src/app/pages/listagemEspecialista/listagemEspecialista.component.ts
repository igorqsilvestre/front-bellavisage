import { Component } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router'; // Import the Router module
import { faTrash } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-listagemespecialista',
  templateUrl: './listagemespecialista.component.html',
  styleUrl: './listagemespecialista.component.css'
})
export class ListagemEspecialistaComponent {
  faMagnifyingGlass = faMagnifyingGlass;
  faEdit = faEdit;
  faTrash = faTrash;


  constructor(private router: Router) {} // Add the Router to the component's constructor

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
  ]

  applyFilterOnTable(event: any, dtListagemEspecialista: any) {
    console.log(event.target.value)
    return dtListagemEspecialista.filterGlobal(event, 'contains')
  }

  editarCadastro(cadastro: any) {
    this.router.navigate(['/especialista/novo-especialista'])

  }

  cancelarCadastro(cadastro: any) {

    if(confirm('Deseja realmente excluir o cadastro?')){
      this.cadastro = this.cadastro.filter(item => item.id !== cadastro.id);

      //TODO: Igor, aqui voce implementa a chamada para o backend para excluir o cadastro especialista
    }

  }

}
