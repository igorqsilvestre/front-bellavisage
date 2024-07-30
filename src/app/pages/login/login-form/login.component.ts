import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

import { AuthService } from '../../../guards/auth.service';
import { FormUtilsService } from '../../../shared/services/form-utils.service';
import { LoginService } from '../login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  formulario!: FormGroup;

  constructor(
    public formUtilService: FormUtilsService,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private authService: AuthService,
    private messageService: MessageService
  ){}


  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      email: [null,  [Validators.required, Validators.pattern(this.formUtilService.patternValidaEmail)]],
      senha: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(16)]],
    });
  }

  onSubmit(){
    if (this.formulario.valid) {
      this.loginService.verificarExisteUsuarioCadastro(this.formulario.value).subscribe(
        dados => {
          if(dados){
            this.authService.realizarLogin();
            this.mostrarMensagemSucesso('Sucesso ao realizar login');
            this.formUtilService.navegarPagina('', 2000);
          }else{
            this.mostrarMensagemErro('Usuario ou senha estão invalidos');
          }
        }
      );
    }else{
      this.formUtilService.marcarCamposInvalidosComoTocado(this.formulario);
    }
  }

  mostrarMensagemErro(mensagem: string) {
    this.messageService.add({ severity: 'error', summary: 'Erro', detail: mensagem, key: 'toast-error' });
  }

  mostrarMensagemSucesso(mensagem: string){
    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: mensagem, key: 'toast-sucess'});
  }

}
