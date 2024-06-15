import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'telefoneFormat'
})
export class TelefonePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return '';
    }

    // Remove todos os caracteres que não são números
    const telefone = value.replace(/\D/g, '');

    // Formata o telefone como (XX) XXXXX-XXXX
    return telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }
}
