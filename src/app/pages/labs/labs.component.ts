import { Component } from '@angular/core';
import { faCheck, faPen, faTimes } from '@fortawesome/free-solid-svg-icons';

interface Agenda {
  code: number;
  avaliacao: number;
  //editing: boolean;
}

@Component({
  selector: 'app-labs',
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  faPen = faPen;
  faCheck = faCheck;
  faTimes = faTimes;

  agendamentos: Agenda[] = [{
    code: 1,
    avaliacao: 2,
    //editing: false
  }]

  onRowEditInit(agenda: Agenda) {
    console.log('Row edit initialized');
    //agenda.editing = true;
  }

  onRowEditSave(agenda: Agenda) {
    console.log('Row edit saved');
    //agenda.editing = false;
  }

  onRowEditCancel(agenda: Agenda, index: number) {
    console.log('Row edit cancelled');
    //agenda.editing = false;
  }
}
