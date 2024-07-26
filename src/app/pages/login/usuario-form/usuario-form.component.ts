import { FormUtilsService } from './../../../shared/services/form-utils.service';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { map } from 'rxjs';

import { EstadoBr } from '../../../shared/models/estado-br';
import { Cep, ConsultaCepService } from '../../../shared/services/consulta-cep.service';
import { LoginService } from '../login.service';
import { DropdownService } from './../../../shared/services/dropdown.service';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrl: './usuario-form.component.css'
})
export class UsuarioFormComponent implements OnInit{

  formulario!: FormGroup;
  estados!: EstadoBr[];

  constructor(
    private formBuilder: FormBuilder,
    private dropdownService: DropdownService,
    private loginService: LoginService,
    private location: Location,
    private formUtilService: FormUtilsService,
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
    const campoCep = this.getCampo('endereco.cep');
    if(campoCep.valid){
       this.cepService.consultaCEP(campoCep.value).subscribe(dados => {
        if(dados){
          this.insereDadosEndereco(dados);
        }else{
          this.formUtilService.mostrarErro('Erro ao buscar o cep');
        }
      });
    }else{
      this.formUtilService.mostrarErro('Erro ao buscar o cep');
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
            this.formUtilService.mostrarSucesso('Cadastro realizado com sucesso')
            this.onCancel(2000);
          },() => {
            this.formUtilService.mostrarErro('Erro ao fazer o cadastro');
          },
        );
    }else{
      this.formUtilService.marcarCamposInvalidosComoTocado(this.formulario);
    }
  }

  getMensagemErro(campoNome: string){
    return this.formUtilService.getMensagemErro(this.formulario,campoNome);
  }

  onCancel(milisegundos = 0){
    setTimeout(() => {
      this.location.back();
    }, milisegundos);
  }

  getCampo(nome:string){
    return this.formulario.get(nome);
  }

  validarEmail(formControl: FormControl) {
    return this.loginService.verificarExisteEmailCadastrado(formControl.value)
      .pipe(map(emailExiste => emailExiste ? { emailExiste: true } : null));
  }

  verificaSenhasIguais(campoNomeSenha: string, campoNomeConfirmarSenha: string){
    if(this.getCampo(campoNomeSenha)?.value === this.getCampo(campoNomeConfirmarSenha)?.value){
      return false;
    }
    return true;
  }

}
