import { DropdownService } from './../../../shared/services/dropdown.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstadoBr } from '../../../shared/models/estado-br';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { LoginService } from '../login.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from '../../../shared/alert-modal/alert-modal.component';
import { UsuarioEmailValidator } from '../UsuarioEmailValidator';
import { Cep, ConsultaCepService } from '../../../shared/services/consulta-cep.service';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrl: './usuario-form.component.css'
})
export class UsuarioFormComponent implements OnInit{

  formulario!: FormGroup;
  estados!: EstadoBr[];
  perfilsAcesso = [{ id: 1, nome: 'Administrador' },{ id: 2, nome: 'Cliente' }];
  modalRef!: BsModalRef;

  constructor(
    private formBuilder: FormBuilder,
    private dropdownService: DropdownService,
    private loginService: LoginService,
    private modalService: BsModalService,
    private usuarioValidator: UsuarioEmailValidator,
    private cepService: ConsultaCepService){}



  ngOnInit(): void {

    this.dropdownService.getEstadosBr().subscribe(dados => {this.estados = dados});

    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      senha: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(16)]],
      confirmarSenha: [null, Validators.required],
      perfilsAcesso: ['Administrador', Validators.required],
      email: [null, {
          validators: [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')],
          asyncValidators: [this.usuarioValidator.validate.bind(this.usuarioValidator)],
          updateOn: 'blur'
      }],
      telefone: [null, [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern(/^[0-9]*$/)]],
      endereco: this.formBuilder.group({
        cep: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(8),Validators.pattern(/^[0-9]*$/)]],
        numero: [null, Validators.pattern(/^[0-9]*$/)],
        complemento: [null],
        bairro: [null, Validators.required],
        logradouro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: ['', Validators.required]
      }),
    });
  }

  onBuscaCep(){
    const cep = this.formulario.get('endereco.cep').value;

    if (cep != null && cep !== '') {
      this.cepService.consultaCEP(cep)
      .subscribe(dados => {
        if(dados){
          this.insereDadosEndereco(dados);
        }
      });
    }
  }

  insereDadosEndereco(dados:Cep){
    this.dropdownService.getEstadoBySigla(dados.uf).subscribe(estado => {
      console.log(estado);
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
        dados => {
          const initialState = {
            type: 'Sucesso!',
            message: 'Cadastro foi realizado com sucesso!',
            navegar: {
              estado: true,
              url: '/login'
            }
          };
          this.modalRef = this.modalService.show(AlertModalComponent, { initialState });
        },error => {
          const initialState = {
            type: 'Erro!',
            message: 'Ocorreu um erro ao realizar o cadastro.!'
          };
          this.modalRef = this.modalService.show(AlertModalComponent, { initialState });
        },
      );
    }else{
      this.marcarCamposInvalidosComoTocado(this.formulario);
    }
  }

  onCancel(){
    this.formulario.reset({
      perfilsAcesso: 'Administrador',
      endereco:{
        estado: ''
      }
    });
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
