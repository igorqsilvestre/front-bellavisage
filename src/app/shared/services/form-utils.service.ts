import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Cep, ConsultaCepService } from './consulta-cep.service';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class FormUtilsService {

  constructor(
    private cepService: ConsultaCepService,
    private messageService: MessageService
  ) { }

   perfilDeAcesso = 'Administrador';
   patternValidaEmail = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
   patternPermiteSomenteNumeros = /^[0-9]*$/;

  getMensagemErro(formulario: FormGroup, campoNome: string){
    const campo = formulario.get(campoNome);

    //Deixar as validações de pattern no começo

    if(campo?.hasError('pattern')){
     if(campo?.getError('pattern').requiredPattern == this.patternValidaEmail){
       return 'Email inválido'
     }

     if(campo?.getError('pattern').requiredPattern == this.patternPermiteSomenteNumeros){
       return 'Somente números são aceito'
     }
     return 'Campo inválido'
    }

    if(campo?.hasError('required')){
     return 'Campo obrigatório';
    }

    if(campo?.hasError('minlength')){
     const tamanho: number = campo.errors ? campo.errors['minlength']['requiredLength'] : 5
     return `Tamanho mínimo precisa ser de ${tamanho} caracteres.`;
    }

    if(campo?.hasError('maxlength')){
     const tamanho: number = campo.errors ? campo.errors['maxlength']['requiredLength'] : 200
     return `Tamanho máximo precisa ser de ${tamanho} caracteres.`;
    }

    //Deixar as validações de banco no final

    if(campo?.hasError('emailExiste')){
     return 'Email já existe no banco de dados';
    }

    return 'Campo inválido';
  }


  mostrarErro(mensagem: string) {
    this.messageService.add({ severity: 'error', summary: 'Erro', detail: mensagem, key: 'toast-error' });
  }

  mostrarSucesso(mensagem: string){
    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: mensagem, key: 'toast-sucess'});
  }


  marcarCamposInvalidosComoTocado(formGroup: FormGroup){
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if(control.invalid){
        control.markAsTouched({onlySelf: true});
      }
      if (control instanceof FormGroup) {
        this.marcarCamposInvalidosComoTocado(control);
      }
    })
  }
}
