import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faMagnifyingGlass, faSave } from '@fortawesome/free-solid-svg-icons';
import { MessageService } from 'primeng/api';

import { FormUtilsService } from '../../../shared/services/form-utils.service';
import { Paciente } from '../../paciente/Paciente';
import { Tratamento } from '../../tratamento/Tratamento';
import { Agendamento } from '../Agendamento';
import { EspecialistaService } from './../../especialista/especialista.service';
import { PacienteService } from './../../paciente/paciente.service';
import { TratamentoService } from './../../tratamento/tratamento.service';
import { AgendamentoService } from './../agendamento.service';
import { HorariosService } from '../../horarios/horarios.service';
import { Horario } from '../../horarios/Horario';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmModalComponent } from '../../../shared/modals/confirm-modal/confirm-modal.component';
import { AlertModalComponent } from '../../../shared/modals/alert-modal/alert-modal.component';


@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrl: './agendamento.component.css'
})
export class AgendamentoComponent implements OnInit{
  formulario!: FormGroup;
  pacientes!: Paciente[];
  tratamentos!: Tratamento[];
  horarios: Horario[];
  titulo:string = 'Cadastro do agendamento';
  nomeBotao:string = 'Cadastrar';
  faMagnifyingGlass = faMagnifyingGlass;
  faSave = faSave;
  modalRef: any;



  constructor(private route: ActivatedRoute,
    public formUtilService: FormUtilsService,
    private pacienteService:PacienteService,
    private tratamentoService:TratamentoService,
    private horarioService: HorariosService,
    private formBuilder:FormBuilder,
    private agendamentoService: AgendamentoService,
    private messageService: MessageService,
    private modalService: BsModalService
  ) {}



  ngOnInit(): void {

    const agendamento: Agendamento = this.route.snapshot.data['agendamento'];

    this.formulario = this.formBuilder.group({
      id:[agendamento.id],
      paciente: [agendamento.paciente, Validators.required],
      especialista: [agendamento.especialista],
      tratamento: [agendamento.tratamento, Validators.required],
      dataHorario: [agendamento.dataHorario, [Validators.required, this.validaDataMenorQueAtual()]],
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

  onAdicionarAgendamento(horario:Horario){

    this.formulario.patchValue({
      dataHorario: horario.data,
      especialista: horario.especialista.id
    });

    this.modalRef = this.modalService.show(ConfirmModalComponent, {
      initialState: {
        type: 'Confirmação',
        message: 'Deseja realmente fazer o agendamento?'
      }
    });


    this.modalRef.content.confirm.subscribe(() => {
      this.agendamentoService.existsDataEhoraAndEspecialistaAndPaciente(this.formulario.value).subscribe(dado => {
        if(dado){
          this.mostrarMensagemErro("Ocorreu um erro pois data e hora já existem no sistema!");
        }else{
          if(this.formulario.valid){
            this.horarioService.alterarDisponibilidade(horario.id, false).subscribe(dado => {
              if(dado){
                this.agendamentoService.salvar(this.formulario.value).subscribe(
                  () => {
                    this.mostrarMensagemSucesso("Cadastro foi realizado com sucesso!");
                    this.formUtilService.voltarPagina(2000);
                  }, () => {
                    this.mostrarMensagemErro("Ocorreu um erro ao realizar o cadastro!");
                  }
                )
              }else{
                this.mostrarMensagemErro("Ocorreu um erro ao realizar o cadastro!");
              }
            })

          }else{
            this.formUtilService.marcarCamposInvalidosComoTocado(this.formulario);
          }
        }
      })
    })
  }


  onCarregarHorarios(){
    if(this.formulario.valid){
      const idTratamento = this.formulario.get('tratamento').value;
      const data = this.formulario.get('dataHorario').value;

      this.horarioService.obterTodosApartirtratamentoEData(idTratamento,data).subscribe((dados:Horario[]) => {
        if(dados){
          this.horarios = dados;
        }}
      );

    }else{
      this.formUtilService.marcarCamposInvalidosComoTocado(this.formulario);
    }
  }

  atualizaListaDePacientesEespecialistasEtratamentos() {
    this.pacienteService.obterTodos().subscribe(dados => {
      if(dados) {
        this.pacientes = dados;
        this.formulario.patchValue({ paciente: dados[0].id });
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

  /*
  onSubmit(){

    if (this.formulario.valid) {
      let mensagemErro = '';
      let mensagemSucesso = '';

      this.agendamentoService.existsDataEhoraAndEspecialista(this.formulario.value).subscribe(dado => {
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
  */


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
