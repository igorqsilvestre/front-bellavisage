import { DropdownService } from './../../../shared/services/dropdown.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstadoBr } from '../../../shared/models/estado-br';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrl: './usuario-form.component.css'
})
export class UsuarioFormComponent implements OnInit, OnDestroy{

  visualizarBarraNav = false;
  formulario!: FormGroup;
  estados!: EstadoBr[];


  constructor(
    private formBuilder: FormBuilder,
    private dropdownService: DropdownService){}



  ngOnInit(): void {

    this.dropdownService.getEstadosBr().subscribe(dados => {this.estados = dados; console.log(dados)});

    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      senha: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(16)]],
      confirmarSenha: [null, Validators.required],
      perfilAcesso: ['opcao1', [Validators.required]],
      email: [null, [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      telefone: [null, [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern(/^[0-9]*$/)]],

      endereco: this.formBuilder.group({
        cep: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(8),Validators.pattern(/^[0-9]*$/)]],
        numero: [null, Validators.pattern(/^[0-9]*$/)],
        complemento: [null],
        rua: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required]
      }),
    });
  }


  onSubmit(){
    if(this.formulario.valid){
      console.log(this.formulario.controls);
    }

  }

  resetaDadosForm() {
    this.formulario.patchValue({
      nome: null,
      senha: null,
      confirmarSenha: null,
      perfilAcesso: 'opcao1',
      email: null,
      telefone: null,
      endereco: {
        cep: null,
        numero: null,
        complemento: null,
        rua: null,
        cidade: null,
        estado: null
      },
    });
  }

  ngOnDestroy(): void {
  }

}
