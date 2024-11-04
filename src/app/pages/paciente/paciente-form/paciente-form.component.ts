import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { catchError, map, of } from 'rxjs';

import { EstadoBr } from '../../../shared/models/estado-br';
import { ConsultaCepService } from '../../../shared/services/consulta-cep.service';
import { DropdownService } from '../../../shared/services/dropdown.service';
import { FormUtilsService } from '../../../shared/services/form-utils.service';
import { CpfUtilValidator } from '../../../shared/validators/CpfUtilValidator';
import { Paciente } from '../Paciente';
import { Cep } from './../../../shared/services/consulta-cep.service';
import { PacienteService } from './../paciente.service';
import { idadeValidator } from '../../../shared/validators/validaIdade';


@Component({
  selector: 'app-paciente-form',
  templateUrl: './paciente-form.component.html',
  styleUrl: './paciente-form.component.css'
})
export class PacienteFormComponent implements OnInit{

  formulario!: FormGroup;
  estados!: EstadoBr[];
  titulo:string = 'Cadastro do paciente';
  nomeBotao:string = 'Cadastrar';


  constructor(
    public formUtilService: FormUtilsService,
    private formBuilder: FormBuilder,
    private dropdownService: DropdownService,
    private pacienteService: PacienteService,
    private cepService: ConsultaCepService,
    private route: ActivatedRoute,
    private messageService: MessageService,
  ){}


  ngOnInit(): void {
    this.dropdownService.getEstadosBr().subscribe(dados => {this.estados = dados});

    const paciente: Paciente = this.route.snapshot.data['paciente'];

    if(paciente.id){
      this.titulo = 'Editar paciente';
      this.nomeBotao = 'Atualizar';
    }

    this.formulario = this.formBuilder.group({
      id:[paciente.id],
      nome: [paciente.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      cpf: [paciente.cpf, [Validators.required, CpfUtilValidator.validate()]],
      email: [paciente.email, [Validators.required, Validators.pattern(this.formUtilService.patternValidaEmail)]],
      senha: [paciente.senha, [Validators.required, Validators.minLength(3), Validators.maxLength(16)]],
      confirmarSenha: [paciente.senha, Validators.required],
      telefone: [paciente.telefone, [Validators.required, Validators.minLength(15), Validators.maxLength(15)]],
      dataNascimento: [new Date(paciente.dataNascimento), [ Validators.required, idadeValidator()] ],
      endereco: this.formBuilder.group({
        cep: [paciente.endereco.cep, [Validators.required, Validators.minLength(8), Validators.maxLength(8),Validators.pattern(this.formUtilService.patternPermiteSomenteNumeros)]],
        numero: [paciente.endereco.numero, Validators.pattern(this.formUtilService.patternPermiteSomenteNumeros)],
        complemento: [paciente.endereco.complemento],
        bairro: [paciente.endereco.bairro, Validators.required],
        logradouro: [paciente.endereco.logradouro, Validators.required],
        cidade: [paciente.endereco.cidade, Validators.required],
        estado: [paciente.endereco.estado, Validators.required]
      }),
    });
  }

  onBuscaCep(){
    const campoCep = this.formulario.get('endereco.cep');
    if(campoCep.valid){
      this.cepService.consultaCEP(campoCep.value).subscribe(dados => {
       if(dados){
        this.insereDadosEndereco(dados);
       }else{
        this.mostrarMensagemErro('Erro ao buscar o cep')
       }
      })
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
      let mensagemSucesso = "Cadastro foi realizado com sucesso!";
      let mensagemErro = "Ocorreu um erro ao realizar o cadastro!"

      if(this.formulario.value.id){
        mensagemSucesso = "Alteração realizada com sucesso!";
        mensagemErro = "Ocorreu um erro ao realizar a edição!";
      }
      this.pacienteService.salvar(this.formulario.value).subscribe(
        () => {
          this.mostrarMensagemSucesso(mensagemSucesso);
          this.formUtilService.voltarPagina(2000);
        },() => {
          this.mostrarMensagemErro(mensagemErro);
        }
      )
    }else{
      this.formUtilService.marcarCamposInvalidosComoTocado(this.formulario);
    }
  }

  validarCpfExiste(formControl: FormControl) {
    const cpf = formControl.value;
    const id = formControl.root.get('id')?.value;
    return this.pacienteService.verificarExisteCPFCadastrado(cpf)
      .pipe(
        map(paciente => paciente && paciente.id !== id ? { cpfExistente: true } : null),
        catchError(() => of(null))
      );
  }

  mostrarMensagemErro(mensagem: string) {
    this.messageService.add({ severity: 'error', summary: 'Erro', detail: mensagem, key: 'toast-error' });
  }

  mostrarMensagemSucesso(mensagem: string){
    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: mensagem, key: 'toast-sucess'});
  }

}
