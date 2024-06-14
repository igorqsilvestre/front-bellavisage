import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private router: Router) {
    this.logoff()
  } // Add the Router to the component's constructor

  logoff() {
    console.log('Logoff');

    localStorage.removeItem('token');
  }

  login() {
    console.log('Login');

    //Igor implemente no backend que Após confimar o login gravar o token
    // no localstorage conforme o exemplo abaixo dentro da const token:
    //const token = await loginService.login(username, password)

    localStorage.setItem('token', '123456');
    //o local storage é um recurso do navegador que permite armazenar no caso a informação que a
    //pessoa está logada no sistema, no caso o token, que é um código que identifica o usuário, e
    //a pessoa não precisa logar novamente ao navegar entre as páginas do sistema.


    this.router.navigate(['']);
  }
}
