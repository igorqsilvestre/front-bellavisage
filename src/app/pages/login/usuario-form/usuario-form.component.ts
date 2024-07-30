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
    private messageService: MessageService,
    private cepService: ConsultaCepService
  ){}


  ngOnInit(): void {
    this.dropdownService.getEstadosBr().subscribe(dados => {this.estados = dados});
    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      senha: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(16)]],
      confirmarSenha: [null, Validators.required],
      perfilsAcesso: [this.formUtilService.perfilDeAcesso, Validators.required],
      email: [null,  [Validators.required, Validators.pattern(this.formUtilService.patternValidaEmail)], [this.validarEmail.bind(this)]],
      telefone: [null, [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern(this.formUtilService.patternPermiteSomenteNumeros)]],
      endereco: this.formBuilder.group({
        cep: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(8),Validators.pattern(this.formUtilService.patternPermiteSomenteNumeros)]],
        numero: [null, Validators.pattern(this.formUtilService.patternPermiteSomenteNumeros)],
        complemento: [null],
        bairro: [null, Validators.required],
        logradouro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: ['', Validators.required]
      }),
    });
  }

  onBuscaCep(){
    const campoCep = this.formulario.get('endereco.cep');
    if(campoCep.valid){
      this.cepService.consultaCEP(campoCep.value).subscribe(dados => {
       if(dados){
        this.insereDadosEndereco(dados);
       }else{
        this.mostrarMensagemErro('Erro ao buscar o cep')
       }
      })
    }
  }


  insereDadosEndereco(dados:Cep){
    this.dropdownService.getEstadoBySigla(dados.uf).subscribe(estado => {
      this.formulario.patchValue({
        endereco: {
          logradouro: dados.logradouro,
          complemento: dados.complemento,
          bairro: dados.bairro,
          cidade: dados.localidade,
          estado: estado.nome
        }
      })
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
