import { LoginEmailValidator } from './../LoginEmailValidator';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { AlertModalComponent } from '../../../shared/alert-modal/alert-modal.component';

@Component({
  selector: 'app-alterar-senha-form',
  templateUrl: './alterar-senha-form.component.html',
  styleUrl: './alterar-senha-form.component.css'
})
export class AlterarSenhaFormComponent implements OnInit, OnDestroy{

  formulario!: FormGroup;
  modalRef!: BsModalRef;
  private loginSubscription!: Subscription;


  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private modalService: BsModalService,
    private loginEmailValidator: LoginEmailValidator
    ){}


  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      email: [null, {
        validators: [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')],
        asyncValidators: [this.loginEmailValidator.validate.bind(this.loginEmailValidator)],
        updateOn: 'blur'
      }],
      senha: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(16)]],
      confirmarSenha: [null, Validators.required],
    });
  }

  onSubmit(){
    if (this.formulario.valid) {

      this.loginSubscription = this.loginService.atualizarSenha(this.formulario.value).subscribe(
        dados => {
          const initialState = {
            type: 'Sucesso!',
            message: 'Senha atualizada com sucesso!'
          };
          this.modalRef = this.modalService.show(AlertModalComponent, {initialState });
          this.formulario.reset();
        },error => {
          const initialState = {
            type: 'Erro!',
            message: 'Ocorreu um erro ao realizar a alteração de senha.!'
          };
          this.modalRef = this.modalService.show(AlertModalComponent, {initialState });
        },
      );
    }
  }


  ngOnDestroy(): void {
    this.loginSubscription.unsubscribe();
  }
}
