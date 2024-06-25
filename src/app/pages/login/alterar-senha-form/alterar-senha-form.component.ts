import { Router } from '@angular/router';
import { LoginEmailValidator } from './../LoginEmailValidator';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject, takeUntil } from 'rxjs';
import { AlertModalComponent } from '../../../shared/alert-modal/alert-modal.component';

@Component({
  selector: 'app-alterar-senha-form',
  templateUrl: './alterar-senha-form.component.html',
  styleUrl: './alterar-senha-form.component.css'
})
export class AlterarSenhaFormComponent implements OnInit, OnDestroy{

  formulario!: FormGroup;
  modalRef!: BsModalRef;
  private destroy$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private modalService: BsModalService,
    private loginEmailValidator: LoginEmailValidator,
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

     this.loginService.atualizarSenha(this.formulario.value).pipe(takeUntil(this.destroy$)).subscribe(
        dados => {
          const initialState = {
            type: 'Sucesso!',
            message: 'Senha atualizada com sucesso!',
            navegar: {
              estado: true,
              url: '/login'
            }
          };
          this.modalRef = this.modalService.show(AlertModalComponent, { initialState });
        },error => {
          const initialState = {
            type: 'Erro!',
            message: 'Ocorreu um erro ao realizar a alteração de senha.!'
          };
          this.modalRef = this.modalService.show(AlertModalComponent, { initialState });
        },
      );
    }else{
      this.marcarCamposInvalidosComoTocado(this.formulario);
    }
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


  ngOnDestroy(): void {
    if(this.destroy$){
      this.destroy$.next();
      this.destroy$.complete();
    }
  }
}
