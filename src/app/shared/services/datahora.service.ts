import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatahoraService {

  constructor() { }

  convertaDataHora(data: string, hora: string): Date | null {
    // Extrair os componentes da data
    const dateParts = data.split('/');
    const month = parseInt(dateParts[0], 10);
    const day = parseInt(dateParts[1], 10);
    const year = parseInt(dateParts[2], 10);

    // Extrair os componentes da hora
    const timeParts = hora.split(':');
    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);

    // Verificar se os valores extraídos são válidos
    if (isNaN(month) || isNaN(day) || isNaN(year) || isNaN(hours) || isNaN(minutes)) {
      return null;
    }

    // Criar um objeto Date com a data e hora
    const dateObj = new Date(year, month - 1, day, hours, minutes);

    // Verificar se a data é válida
    if (isNaN(dateObj.getTime())) {
      return null;
    }

    return dateObj;
  }
}
