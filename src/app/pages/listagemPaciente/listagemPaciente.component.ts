import { Component } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router'; // Import the Router module
import { faTrash } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-listagempaciente',
  templateUrl: './listagempaciente.component.html',
  styleUrl: './listagempaciente.component.css'
})
export class ListagemPacienteComponent {
  faMagnifyingGlass = faMagnifyingGlass;
  faEdit = faEdit;
  faTrash = faTrash;


  constructor(private router: Router) {} // Add the Router to the component's constructor

  cadastro = [
    {
      id: 1,
      nome: 'Maria Eduarda',
      cpf: '015.189.456-98',
      telefone: '(11) 99999-9999',
      endereco: 'Rua das Flores QD. 10 LT. 20',
    },
    {
      id: 2,
      nome: 'Paulo Henrique Cabral',
      cpf: '096.189.456-98',
      telefone: '(11) 99900-9299',
      endereco: 'Rua Sergipe QD. 14 LT. 2',
    },
    {
      id: 3,
      nome: 'Carlos Eduardo de Souza',
      cpf: '037.189.456-98',
      telefone: '(11) 99888-9999',
      endereco: 'Rua São Paulo QD. 4P LT. 30',
    },
    {
      id: 4,
      nome: 'Márcia Maria de Souza',
      cpf: '029.189.456-98',
      telefone: '(11) 99999-7777',
      endereco: 'Rua Espirito Santo QD.9A LT. 3',
    },
    {
      id: 5,
      nome: 'Flávia Couto Magalhães',
      cpf: '059.189.456-98',
      telefone: '(11) 99999-8888',
      endereco: 'Rua Pará QD. 19 LT. 5',
    }
  ]

  applyFilterOnTable(event: any, dtListagemPaciente: any) {
    console.log(event.target.value)
    return dtListagemPaciente.filterGlobal(event, 'contains')
  }

  editarCadastro(cadastro: any) {
    this.router.navigate(['/agendar/novo-paciente'])

  }

  cancelarCadastro(cadastro: any) {

    if(confirm('Deseja realmente excluir o cadastro?')){
      this.cadastro = this.cadastro.filter(item => item.id !== cadastro.id);

      //TODO: Igor, aqui voce implementa a chamada para o backend para excluir o cadastro
    }

  }

}
