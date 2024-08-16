import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { Cep, ConsultaCepService } from './consulta-cep.service';


@Injectable({
  providedIn: 'root'
})
export class FormUtilsService {

  constructor(
    private location: Location,
    private route: Router,
  ) { }

  perfilDeAcesso = 'Administrador';
  patternValidaEmail = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  patternPermiteSomenteNumeros = /^[0-9]*$/;

  voltarPagina(milisegundos = 0){
    setTimeout(() => {
      this.location.back();
    }, milisegundos);
  }

  navegarPagina(alvo:string, milisegundos = 0){
    setTimeout(() => {
      this.route.navigate([`${alvo}`]);
    }, milisegundos);
  }

  getMensagemErro(formulario: FormGroup, campoNome: string){
    const campo = formulario.get(campoNome);
    if(!campo.valid){
        //Deixar as validações de pattern no começo
      if(campo?.hasError('pattern')){
        if(campo?.getError('pattern').requiredPattern == this.patternValidaEmail){
          return 'Email inválido';
        }

        if(campo?.getError('pattern').requiredPattern == this.patternPermiteSomenteNumeros){
          return 'Somente números são aceito';
        }
        return 'Campo inválido';
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

      if(campo?.hasError('invalidCpf')){
        return 'Cpf inválido';
      }

      if(campo?.hasError('dataMenorQueAtual')){
        return 'Data não pode ser menor que a data atual';
      }

      //Deixar as validações de banco no final
      if(campo?.hasError('emailExiste')){
        return 'Email já existe no banco de dados';
      }

      if(campo?.hasError('emailNaoExiste')){
        return 'Email não existe no banco de dados';
      }

      if(campo?.hasError('cpfExistente')){
        return 'Cpf já existe no banco de dados';
      }

      if(campo?.hasError('registroExistente')){
        return 'Registro já existe no banco de dados';
      }

      if(campo?.hasError('tratamentoExistente')){
        return 'Tratamento já existe no banco de dados';
      }

      return 'Campo inválido';
    }
    return null;
  }

  verificaSenhasIguais(formulario: FormGroup, campoNomeSenha: string, campoNomeConfirmarSenha: string){
    if(formulario.get(campoNomeSenha)?.value === formulario.get(campoNomeConfirmarSenha)?.value){
      return false;
    }
    return true;
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
