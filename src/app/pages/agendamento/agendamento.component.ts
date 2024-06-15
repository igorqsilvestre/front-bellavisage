import { Component } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router'; // Import the Router module
import { Time } from '@angular/common';


@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrl: './agendamento.component.css'
})
export class AgendamentoComponent {
  faMagnifyingGlass = faMagnifyingGlass;


   date: Date;
   time: Time;

  constructor(private router: Router) {} // Add the Router to the component's constructor


  cadastro = [
    {
      id: 1,
      data:'25/06/2024',
      horas: '14:00',
      nome: 'Maria Eduarda',
      tratamento: 'Carboxiterapia',
      especialista: 'Dr. Margarida Eduarda',
      valor: 120.00,
      status: 'Aberto',
    },
    {
      id: 2,
      data:'05/06/2024',
      horas: '16:00',
      nome: 'Carlos Eduardo de Souza',
      tratamento: 'Criolipólise',
      especialista: 'Dr. Paulo Henrique Cabral',
      valor: 120.00,
      status: 'Concluído',
    },
    {
      id: 3,
      data:'07/06/2024',
      horas: '14:20',
      nome: 'Márcia Maria de Souza',
      tratamento: 'Drenagem Linfática',
      especialista: 'Dr.Lúcia Lane de Souza',
      valor: 300.00,
      status: 'Concluído',
    },
    {
      id: 4,
      data:'08/06/2024',
      horas: '11:00',
      nome: 'Carlos Eduardo de Souza',
      tratamento: 'carboxiterapia',
      especialista: 'Dr. Paulo Henrique Cabral',
      valor: 120.00,
      status: 'Concluído',
    },
    {
      id: 5,
      data:'29/06/2024',
      horas: '15:00',
      nome: 'Flávia Couto Magalhães',
      tratamento: 'Pelling Químico',
      especialista: 'Dr. Margarida Eduarda',
      valor: 200.00,
      status: 'Aberto',
    }
  ]

  applyFilterOnTable(event: any, dtAgendamento: any) {
    console.log(event.target.value)
    return dtAgendamento.filterGlobal(event, 'contains')
  }

  editarCadastro() {
    this.router.navigate(['/agendar/novo-paciente'])

  }
}
