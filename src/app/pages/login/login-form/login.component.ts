import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LoginService } from '../login.service';
import { AuthService } from '../../../guards/auth.service';
import { AlertModalComponent } from '../../../shared/alert-modal/alert-modal.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy{

  formulario!: FormGroup;
  modalRef!: BsModalRef;
  private loginSubscription!: Subscription;

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
      this.loginSubscription = this.loginService.verificarExisteUsuarioCadastro(this.formulario.value).subscribe(
        dados => {
          if(dados){
            this.authService.realizarLogin(dados);
            const initialState = {
              type: 'Sucesso!',
              message: 'Sucesso ao realizar login!',
              navegar: {
                estado: true,
                url: '/'
              }
            };
            this.modalRef = this.modalService.show(AlertModalComponent, { initialState });
          }else{
              const initialState = {
                type: 'Erro!',
                message: 'Usuario ou senha estão invalidos!'
              };
              this.modalRef = this.modalService.show(AlertModalComponent, { initialState });
          }
        }
      );

    }
  }

  ngOnDestroy(): void {
    if(this.loginSubscription){
      this.loginSubscription.unsubscribe();
    }

  }

}