import { PagamentoService } from './../pagamento.service';
import { AgendamentoService } from './../../agendamento/agendamento.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Agendamento } from '../../agendamento/Agendamento';
import { FormUtilsService } from '../../../shared/services/form-utils.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { Pagamento } from '../Pagamento';

@Component({
  selector: 'app-pagamento-form',
  templateUrl: './pagamento-form.component.html',
  styleUrl: './pagamento-form.component.css'
})
export class PagamentoFormComponent implements OnInit{
  formulario!: FormGroup;
  agendamentos!: Agendamento[];
  titulo:string = 'Cadastro do pagamento';
  nomeBotao:string = 'Cadastrar';
  especialista: string = '';
  paciente: string = '';
  tratamento: string = '';
  valor:number = null;
  formasDePagamento = ['Pix', 'Dinheiro', 'Debito', 'Credito1x', 'Credito2x', 'Credito3x', 'Credito4x', 'Credito5x', 'Credito6x'];

  constructor(
    public formUtilService: FormUtilsService,
    private route: ActivatedRoute,
    private agendamentoService: AgendamentoService,
    private formBuilder:FormBuilder,
    private messageService: MessageService,
    private pagamentoService: PagamentoService
  ){}


  ngOnInit(): void {

    const pagamento: Pagamento = this.route.snapshot.data['pagamento'];

    if(pagamento.id){
      this.titulo = 'Editar pagamento';
      this.nomeBotao = 'Atualizar';
      pagamento.dataHorario = new Date(pagamento.dataHorario);
    }

    this.formulario = this.formBuilder.group({
      id:[pagamento.id],
      agendamento: [pagamento.agendamento],
      valor: [pagamento.valor],
      dataHorario: [pagamento.dataHorario],
      formaDePagamento:[pagamento.formaDePagamento, Validators.required],
    });

    this.atualizaListaDeAgendamentos();
    this.atualizaEspecialistaPacienteTratamentoValor();

  }

  atualizaListaDeAgendamentos(){
    this.agendamentoService.obterTodos().subscribe(dados => {
      if(dados){
        this.agendamentos = dados;
        this.formulario.patchValue({ agendamento: dados[0].id});
      }
    })
  }

  atualizaEspecialistaPacienteTratamentoValor(){
    this.formulario.get('agendamento')!.valueChanges.subscribe(id => {
      if(id){
        this.agendamentoService.obter(id).subscribe(agendamento => {
          if(agendamento){
            this.especialista = agendamento.especialista.nome;
            this.paciente = agendamento.paciente.nome;
            this.tratamento = agendamento.tratamento.nome;
            this.formulario.patchValue({
              valor: agendamento.tratamento.valor
            })
          }
        })
      }
    })
  }


  onSubmit(){
    if(this.formulario.valid){
      let mensagemSucesso = "Cadastro foi realizado com sucesso!";
      let mensagemErro = "Ocorreu um erro ao realizar o cadastro!"

      if(this.formulario.value.id){
        mensagemSucesso = "Alteração realizada com sucesso!";
        mensagemErro = "Ocorreu um erro ao realizar a edição!";
      }else{
        this.formulario.patchValue({
          dataHorario: new Date()
        })
      }

      this.pagamentoService.salvar(this.formulario.value).subscribe(
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

  mostrarMensagemErro(mensagem: string) {
    this.messageService.add({ severity: 'error', summary: 'Erro', detail: mensagem, key: 'toast-error' });
  }

  mostrarMensagemSucesso(mensagem: string){
    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: mensagem, key: 'toast-sucess'});
  }

}
