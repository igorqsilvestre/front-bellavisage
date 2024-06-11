import { Component } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router'; // Import the Router module
import { faTrash } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-listagemtratamento',
  templateUrl: './listagemtratamento.component.html',
  styleUrl: './listagemtratamento.component.css'
})
export class ListagemTratamentoComponent {
  faMagnifyingGlass = faMagnifyingGlass;
  faEdit = faEdit;
  faTrash = faTrash;


  constructor(private router: Router) {} // Add the Router to the component's constructor

  cadastro = [
    {
      id: 1,
      nome: 'Carboxiterapia',
      descricao: 'A carboxiterapia é indicada também como tratamento complementar das lipoaspirações para reduzir as irregularidades e diminuir o aspecto enrugado ',
      especialista: 'Dra. Margarida, Dra. Lúcia',
      preco: "150.00",
    },
    {
      id: 2,
      nome: 'Criofequência',
      descricao: 'A celulite é reduzida à medida que a gordura é eliminada e a pele é reafirmada, resultando em uma aparência mais suave e uniforme. A flacidez é combatida de dentro para fora, proporcionando uma sensação de firmeza e rejuvenescimento ',
      especialista: 'Dra. Margarida, Dra. Lúcia',
      preco: "200.00",
    },
    {
      id: 3,
      nome: 'Laser Vênus',
      descricao: 'O Laser Vênus é um equipamento utilizado em diversos procedimentos estéticos. Combina a luz gerada por leds e lasers para proporcionar ação analgésica, anti-inflamatória e bioestimulação de colágeno.',
      especialista: 'Dra. Margarida, Dra. Lúcia',
      preco: "100.00",
    },
    {
      id: 4,
      nome: 'Harmonização Facial',
      descricao: 'A harmonização facial é uma técnica de preenchimento facial (minimamente invasiva) podendo ser associada a outros procedimentos estéticos com o intuito de rejuvenescer e melhorar a aparência da pele promovendo um alinhamento e correção dos ângulos da face, trazendo assim harmonia para este rosto ou até mesmo realçar a beleza e as características já existentes. ',
      especialista: 'Dra. Margarida, Dra. Lúcia',
      preco: "1000.00",
    },
    {
      id: 5,
      nome: 'Radiofrequência',
      descricao: 'A Radiofrequência é um tratamento utilizado para combater a celulite e flacidez da face e do corpo (Radiofrequência facial e corporal).',
      especialista: 'Dra. Margarida, Dra. Lúcia',
      preco: "250.00",
    }
  ]

  applyFilterOnTable(event: any, dtListagemTratamento: any) {
    console.log(event.target.value)
    return dtListagemTratamento.filterGlobal(event, 'contains')
  }

  editarCadastro(cadastro: any) {
    this.router.navigate(['/tratamento/novo-tratamento'])

  }

  cancelarCadastro(cadastro: any) {

    if(confirm('Deseja realmente excluir o cadastro?')){
      this.cadastro = this.cadastro.filter(item => item.id !== cadastro.id);

      //TODO: Igor, aqui voce implementa a chamada para o backend para excluir o cadastro tratamento
    }

  }

}
