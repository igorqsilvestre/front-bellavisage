import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function idadeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const dataNascimento: Date = control.value;

    if (!(dataNascimento instanceof Date) || isNaN(dataNascimento.getTime())) {
      return null; // Se não houver valor ou a data for inválida, não aplicar validação
    }

    const hoje = new Date();
    let idade = hoje.getFullYear() - dataNascimento.getFullYear();

    // Ajusta a idade se o aniversário ainda não ocorreu este ano
    if (
      hoje.getMonth() < dataNascimento.getMonth() ||
      (hoje.getMonth() === dataNascimento.getMonth() && hoje.getDate() < dataNascimento.getDate())
    ) {
      idade--;
    }

    // Verifica se a idade é menor que 18 anos
    if (idade < 18) {
      return { menorDeIdade: true }; // Retorna erro se menor de idade
    }

    return null; // Retorna null se a idade for igual ou maior que 18 anos
  };
}
