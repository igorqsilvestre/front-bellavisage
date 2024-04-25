import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  nomeCards: string[] = ['Agendar Atendimento', 'Gerenciar Agendamentos', 'Gerenciar Pagamentos', 'Gerenciar Especialista', 'Gerenciar Clínica',
    'Faturamento', 'Gerenciar Tratamentos', 'Agendar Atendimento', 'Avalie o serviço'
  ];


}
