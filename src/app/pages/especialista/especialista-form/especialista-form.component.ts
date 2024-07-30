import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { catchError, map, of } from 'rxjs';

import { EstadoBr } from '../../../shared/models/estado-br';
import { Cep, ConsultaCepService } from '../../../shared/services/consulta-cep.service';
import { DropdownService } from '../../../shared/services/dropdown.service';
import { FormUtilsService } from '../../../shared/services/form-utils.service';
import { Especialista } from '../Especialista';
import { EspecialistaService } from '../especialista.service';

@Component({
  selector: 'app-especialista-form',
  templateUrl: './especialista-form.component.html',
  styleUrl: './especialista-form.component.css'
})
export class EspecialistaFormComponent implements OnInit{

  formulario!: FormGroup;
  estados!: EstadoBr[];
  titulo:string = 'Cadastro do especialista';
  nomeBotao:string = 'Cadastrar';

  constructor(
    public formUtilService: FormUtilsService,
    private formBuilder: FormBuilder,
    private dropdownService: DropdownService,
    private especialistaService: EspecialistaService,
    private route: ActivatedRoute,
    private cepService: ConsultaCepService,
    private messageService: MessageService
  ){}


  ngOnInit(): void {
    this.dropdownService.getEstadosBr().subscribe(dados => {this.estados = dados});

    const especialista: Especialista = this.route.snapshot.data['especialista'];

    if(especialista.id){
      this.titulo = 'Editar especialista';
      this.nomeBotao = 'Atualizar';
    }

    this.formulario = this.formBuilder.group({
      id:[especialista.id],
      nome: [especialista.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      especialidade: [especialista.especialidade, Validators.required],
      registro: [especialista.registro, [Validators.required, Validators.pattern(this.formUtilService.patternPermiteSomenteNumeros)], [this.validarRegistroExiste.bind(this)]],
      email: [especialista.email, [Validators.required, Validators.pattern(this.formUtilService.patternValidaEmail)]],
      telefone: [especialista.telefone, [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern(this.formUtilService.patternPermiteSomenteNumeros)]],
      endereco: this.formBuilder.group({
        cep: [especialista.endereco.cep, [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern(this.formUtilService.patternPermiteSomenteNumeros)]],
        numero: [especialista.endereco.numero, Validators.pattern(this.formUtilService.patternPermiteSomenteNumeros)],
        complemento: [especialista.endereco.complemento],
        bairro: [especialista.endereco.bairro, Validators.required],
        logradouro: [especialista.endereco.logradouro, Validators.required],
        cidade: [especialista.endereco.cidade, Validators.required],
        estado: [especialista.endereco.estado, Validators.required]
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
        mensagemSucesso = "Alteração realizada com sucesso!"
        mensagemErro = "Ocorreu um erro ao realizar a edição!"
      }
      this.especialistaService.salvar(this.formulario.value).subscribe(
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


  validarRegistroExiste(formControl: FormControl) {
    const registro = formControl.value;
    const id = formControl.root.get('id')?.value;
    return this.especialistaService.verificarExisteRegistroCadastrado(registro)
      .pipe(
        map(especialista => especialista && especialista.id !== id ? { registroExistente: true } : null),
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
