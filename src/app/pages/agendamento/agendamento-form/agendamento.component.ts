import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { MessageService } from 'primeng/api';

import { FormUtilsService } from '../../../shared/services/form-utils.service';
import { Especialista } from '../../especialista/Especialista';
import { Paciente } from '../../paciente/Paciente';
import { Tratamento } from '../../tratamento/Tratamento';
import { Agendamento } from '../Agendamento';
import { DatahoraService } from './../../../shared/services/datahora.service';
import { EspecialistaService } from './../../especialista/especialista.service';
import { PacienteService } from './../../paciente/paciente.service';
import { TratamentoService } from './../../tratamento/tratamento.service';
import { AgendamentoService } from './../agendamento.service';


@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrl: './agendamento.component.css'
})
export class AgendamentoComponent implements OnInit{
  formulario!: FormGroup;
  pacientes!: Paciente[];
  especialistas!: Especialista[];
  tratamentos!: Tratamento[];
  titulo:string = 'Cadastro do agendamento';
  nomeBotao:string = 'Cadastrar';
  faMagnifyingGlass = faMagnifyingGlass;



  constructor(private route: ActivatedRoute,
    public formUtilService: FormUtilsService,
    private pacienteService:PacienteService,
    private especialistaService:EspecialistaService,
    private tratamentoService:TratamentoService,
    private formBuilder:FormBuilder,
    private agendamentoService: AgendamentoService,
    private dataHoraService: DatahoraService,
    private messageService: MessageService
  ) {}



  ngOnInit(): void {

    const agendamento: Agendamento = this.route.snapshot.data['agendamento'];

    if(agendamento.id){
      this.titulo = 'Editar agendamento';
      this.nomeBotao = 'Atualizar';
    }

    this.formulario = this.formBuilder.group({
      id:[agendamento.id],
      paciente: [agendamento.paciente, Validators.required],
      especialista: [agendamento.especialista, Validators.required],
      tratamento: [agendamento.tratamento, Validators.required],
      data: [this.dataHoraService.convertaDataHora(agendamento.data, agendamento.hora), [Validators.required, this.validaDataMenorQueAtual()]],
      hora: [this.dataHoraService.convertaDataHora(agendamento.data, agendamento.hora), Validators.required],
      valor: [agendamento.valor, [Validators.required]],
      status:[agendamento.status],
      avaliacao:[agendamento.avaliacao]
    });

    this.atualizaValorDoTratamento();
    this.atualizaListaDePacientesEespecialistasEtratamentos();

  }

  atualizaValorDoTratamento(){
    this.formulario.get('tratamento')!.valueChanges.subscribe(id => {
      if(id){
        this.tratamentoService.obter(id).subscribe(tratamento => {
          if(tratamento) this.formulario.get('valor')!.setValue(tratamento.valor.toString().replaceAll(',','').split('.')[0]);
        });
      }
    })
  }

  atualizaListaDePacientesEespecialistasEtratamentos() {
    this.pacienteService.obterTodos().subscribe(dados => {
      if(dados) {
        this.pacientes = dados;
        this.formulario.patchValue({ paciente: dados[0].id });
      }
    });

   this.especialistaService.obterTodos().subscribe(dados => {
      if(dados) {
        this.especialistas = dados;
        this.formulario.patchValue({ especialista: dados[0].id });
      }
    });

    this.tratamentoService.obterTodos().subscribe(dados => {
      if(dados) {
        this.tratamentos = dados
        this.formulario.patchValue({ tratamento: dados[0].id });
      }
    });
  }

  applyFilterOnTable(event: any, dtAgendamento: any) {
    return dtAgendamento.filterGlobal(event, 'contains')
  }

  onSubmit(){

    if (this.formulario.valid) {
      this.formulario.patchValue({
        data: this.dataHoraService.formatarDataParaString(this.formulario.get('data').value),
        hora: this.dataHoraService.formatarHoraParaString(this.formulario.get('hora').value)
      })

      let mensagemErro = '';
      let mensagemSucesso = '';

      this.agendamentoService.existeDataHora(this.formulario.value).subscribe(dado => {
        if(dado){
          this.mostrarMensagemErro("Ocorreu um erro pois essa data e hora já existem no sistema!");
        }else{
          mensagemSucesso = "Cadastro foi realizado com sucesso!";
          mensagemErro = "Ocorreu um erro ao realizar o cadastro!"

          if(this.formulario.value.id){
            mensagemSucesso = "Alteração realizada com sucesso!"
            mensagemErro = "Ocorreu um erro ao realizar a edição!"
          }
          this.agendamentoService.salvar(this.formulario.value).subscribe(
            () => {
              this.mostrarMensagemSucesso(mensagemSucesso);
              this.formUtilService.voltarPagina(2000);
            },() => {
              this.mostrarMensagemErro(mensagemErro);
            }
          )
        }
      })
    }else{
      this.formUtilService.marcarCamposInvalidosComoTocado(this.formulario);
    }
  }


  validaDataMenorQueAtual(): ValidatorFn{
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value) {
        const dataHoje = new Date();
        const data = new Date(control.value);

        dataHoje.setHours(0, 0, 0, 0);
        data.setHours(0, 0, 0, 0);

        return data.getTime() < dataHoje.getTime() ? { dataMenorQueAtual: true } : null;
      }
      return null;
    };
  }

  mostrarMensagemErro(mensagem: string) {
    this.messageService.add({ severity: 'error', summary: 'Erro', detail: mensagem, key: 'toast-error' });
  }

  mostrarMensagemSucesso(mensagem: string){
    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: mensagem, key: 'toast-sucess'});
  }

}
