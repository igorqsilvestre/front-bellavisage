import { ConsultaCepService } from './../../../shared/services/consulta-cep.service';
import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';

import { EstadoBr } from '../../../shared/models/estado-br';
import { Cep } from '../../../shared/services/consulta-cep.service';
import { LoginService } from '../login.service';
import { DropdownService } from './../../../shared/services/dropdown.service';
import { FormUtilsService } from './../../../shared/services/form-utils.service';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrl: './usuario-form.component.css'
})
export class UsuarioFormComponent implements OnInit{

  formulario!: FormGroup;
  estados!: EstadoBr[];

  constructor(
    public formUtilService: FormUtilsService,
    private formBuilder: FormBuilder,
    private dropdownService: DropdownService,
    private loginService: LoginService,
    private messageService: MessageService
  ){}


  ngOnInit(): void {
    this.dropdownService.getEstadosBr().subscribe(dados => {this.estados = dados});
    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      email: [null,  [Validators.required, Validators.pattern(this.formUtilService.patternValidaEmail)], [this.validarEmail.bind(this)]],
      senha: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(16)]],
      confirmarSenha: [null, Validators.required],
      telefone: [null, [Validators.required, Validators.minLength(15), Validators.maxLength(15)]],
    });
  }


  onSubmit(){
    if (this.formulario.valid) {
        this.loginService.criarUsuario(this.formulario.value).subscribe(
          () => {
            this.mostrarMensagemSucesso('Cadastro realizado com sucesso');
            this.formUtilService.voltarPagina(2000);
          },() => {
            this.mostrarMensagemErro('Erro ao fazer o cadastro');
          },
        );
    }else{
      this.formUtilService.marcarCamposInvalidosComoTocado(this.formulario);
    }
  }

  validarEmail(formControl: FormControl) {
    const email = formControl.value;
    return this.loginService.verificarExisteEmailCadastrado(email)
      .pipe(map(emailExiste => emailExiste ? { emailExiste: true } : null));
  }

  mostrarMensagemErro(mensagem: string) {
    this.messageService.add({ severity: 'error', summary: 'Erro', detail: mensagem, key: 'toast-error' });
  }

  mostrarMensagemSucesso(mensagem: string){
    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: mensagem, key: 'toast-sucess'});
  }

}
