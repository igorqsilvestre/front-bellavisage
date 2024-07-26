import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { AlertModalComponent } from '../../../shared/alert-modal/alert-modal.component';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-alterar-senha-form',
  templateUrl: './alterar-senha-form.component.html',
  styleUrl: './alterar-senha-form.component.css'
})
export class AlterarSenhaFormComponent implements OnInit{

  formulario!: FormGroup;
  modalRef!: BsModalRef;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private modalService: BsModalService,
    ){}


  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      senha: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(16)]],
      confirmarSenha: [null, Validators.required],
    });
  }

  onSubmit(){
    if (this.formulario.valid) {

     this.loginService.atualizarSenha(this.formulario.value).subscribe(
        dados => {
          this.modalRef = this.modalService.show(AlertModalComponent, {
            initialState: {
              type: 'Sucesso!',
              message: 'Senha atualizada com sucesso!',
              navegar: {
                estado: true,
                url: '/login'
              }
            }
           });
        },error => {
          this.modalRef = this.modalService.show(AlertModalComponent, {
            initialState: {
                type: 'Erro!',
                message: 'Ocorreu um erro ao realizar a alteração de senha.!'
            }
           });
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
}
