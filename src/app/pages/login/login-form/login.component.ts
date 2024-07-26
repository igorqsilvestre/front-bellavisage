import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LoginService } from '../login.service';
import { AuthService } from '../../../guards/auth.service';
import { AlertModalComponent } from '../../../shared/alert-modal/alert-modal.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  formulario!: FormGroup;
  modalRef!: BsModalRef;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private modalService: BsModalService,
    private authService: AuthService){}


  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      senha: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(16)]],
    });
  }

  onSubmit(){
    if (this.formulario.valid) {
      this.loginService.verificarExisteUsuarioCadastro(this.formulario.value).subscribe(
        dados => {
          if(dados){
            this.authService.realizarLogin();
            this.modalRef = this.modalService.show(AlertModalComponent, {
              initialState: {
                type: 'Sucesso!',
                message: 'Sucesso ao realizar login!',
                navegar: {
                  estado: true,
                  url: '/'
                }
              }
            });
          }else{
              this.modalRef = this.modalService.show(AlertModalComponent, {
                initialState: {
                   type: 'Erro!',
                  message: 'Usuario ou senha estão invalidos!'
                }
              });
          }
        }
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
