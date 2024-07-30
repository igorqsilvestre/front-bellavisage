import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { map } from 'rxjs';

import { FormUtilsService } from '../../../shared/services/form-utils.service';
import { LoginService } from '../login.service';


@Component({
  selector: 'app-alterar-senha-form',
  templateUrl: './alterar-senha-form.component.html',
  styleUrl: './alterar-senha-form.component.css'
})
export class AlterarSenhaFormComponent implements OnInit{

  formulario!: FormGroup;

  constructor(
    public formUtilService: FormUtilsService,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private messageService: MessageService
    ){}


  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      email: [null,  [Validators.required, Validators.pattern(this.formUtilService.patternValidaEmail)], [this.validarEmail.bind(this)]],
      senha: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(16)]],
      confirmarSenha: [null, Validators.required],
    });
  }

  onSubmit(){
    if (this.formulario.valid) {
     this.loginService.atualizarSenha(this.formulario.value).subscribe(
        () => {
         this.mostrarMensagemSucesso('Senha atualizada com sucesso');
         this.formUtilService.voltarPagina(2000);
        },() => {
         this.mostrarMensagemErro('Erro ao alterar senha.');
        },);
    }else{
     this.formUtilService.marcarCamposInvalidosComoTocado(this.formulario);
    }
  }

  validarEmail(formControl: FormControl) {
    const email = formControl.value;
    return this.loginService.verificarExisteEmailCadastrado(email)
      .pipe(map(emailNaoExiste => !emailNaoExiste ? { emailNaoExiste: true } : null));
  }

  mostrarMensagemErro(mensagem: string) {
    this.messageService.add({ severity: 'error', summary: 'Erro', detail: mensagem, key: 'toast-error' });
  }

  mostrarMensagemSucesso(mensagem: string){
    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: mensagem, key: 'toast-sucess'});
  }
}
