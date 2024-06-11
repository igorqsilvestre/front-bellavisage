
import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { Observable, map } from "rxjs";
import { LoginService } from "./login.service";


@Injectable()
export class LoginEmailValidator implements AsyncValidator{

  constructor(private loginService: LoginService){}

  validate(control: AbstractControl<any, any>):  Observable<ValidationErrors | null> {
    const email = control.value;
    return this.loginService.verificarExisteEmailCadastrado(email).pipe(
    map((existe: boolean) => {
      return !existe ? { emailInexistente: true } : null;
    }),)
  }

}
