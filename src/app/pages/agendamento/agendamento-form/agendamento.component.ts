import { DatahoraService } from './../../../shared/services/datahora.service';
import { AgendamentoService } from './../agendamento.service';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { TratamentoService } from './../../tratamento/tratamento.service';
import { EspecialistaService } from './../../especialista/especialista.service';
import { PacienteService } from './../../paciente/paciente.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Agendamento } from '../Agendamento';
import { AlertModalComponent } from '../../../shared/alert-modal/alert-modal.component';
import { Paciente } from '../../paciente/Paciente';
import { Especialista } from '../../especialista/Especialista';
import { Tratamento } from '../../tratamento/Tratamento';


@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrl: './agendamento.component.css'
})
export class AgendamentoComponent implements OnInit{
  formulario!: FormGroup;
  modalRef!: BsModalRef;
  pacientes!: Paciente[];
  especialistas!: Especialista[];
  tratamentos!: Tratamento[];
  titulo:string = 'Agendamento do Paciente';
  nomeBotao:string = 'Agendar';
  faMagnifyingGlass = faMagnifyingGlass;



  constructor(private route: ActivatedRoute,
    private pacienteService:PacienteService,
    private especialistaService:EspecialistaService,
    private tratamentoService:TratamentoService,
    private formBuilder:FormBuilder,
    private modalService: BsModalService,
    private agendamentoService: AgendamentoService,
    private dataHoraService: DatahoraService) {}



  ngOnInit(): void {


    this.formulario = this.formBuilder.group({
      id:[null],
      paciente: [null, Validators.required],
      especialista: [null, Validators.required],
      tratamento: [null, Validators.required],
      data: [null, [Validators.required, this.validaDataMenorQueAtual()]],
      hora: [null, Validators.required],
      valor: [null, [Validators.required]],
      status:[null],
      avaliacao:[null]
    });

    this.atualizaValorDoTratamento();

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

    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.titulo = 'Editar agendamento do especialista';
      this.nomeBotao = 'Atualizar';
      this.agendamentoService.obter(Number(this.route.snapshot.paramMap.get('id'))).subscribe(
        dados => {if(dados) this.onUpdate(dados)}
      )
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

  atualizaValorDoTratamento(){
    this.formulario.get('tratamento')!.valueChanges.subscribe(id => {
      if(id){
      this.tratamentoService.obter(id).subscribe(tratamento => {
        if(tratamento) this.formulario.get('valor')!.setValue(tratamento.valor.toString().replaceAll(',','').split('.')[0]);
      });
      }
    })
  }

  onUpdate(agendamento:Agendamento){
    const data = this.dataHoraService.convertaDataHora(agendamento.data, agendamento.hora);

    this.formulario.patchValue({
      id:agendamento.id,
      paciente: agendamento.paciente.id,
      especialista: agendamento.especialista.id,
      tratamento: agendamento.tratamento.id,
      data: data,
      hora: data,
      valor: agendamento.valor,
      status: agendamento.status,
      avaliacao: agendamento.avaliacao
    })

  }

  applyFilterOnTable(event: any, dtAgendamento: any) {
    console.log(event.target.value)
    return dtAgendamento.filterGlobal(event, 'contains')
  }

  onSubmit(){

    if (this.formulario.valid) {
      this.formulario.patchValue({
        data: this.formatarDataParaString(this.formulario.get('data').value),
        hora: this.formatarHoraParaString(this.formulario.get('hora').value)
      })

      let mensagemErro = '';
      let mensagemSucesso = '';

      this.agendamentoService.existeDataHora(this.formulario.value).subscribe(dado => {
        if(dado){
          mensagemErro = "Ocorreu um erro pois essa data e hora já existem no sistema!"
          this.modalRef = this.modalService.show(AlertModalComponent, {  initialState: {type: 'Erro!', message: mensagemErro}  });
        }else{
          mensagemSucesso = "Cadastro foi realizado com sucesso!";
          mensagemErro = "Ocorreu um erro ao realizar o cadastro!"
          const ir =  {estado: true, url: 'agendamentos'};

          if(this.formulario.value.id){
            mensagemSucesso = "Alteração realizada com sucesso!"
            mensagemErro = "Ocorreu um erro ao realizar a edição!"
          }
          this.agendamentoService.salvar(this.formulario.value).subscribe(
            dados => {
              this.modalRef = this.modalService.show(AlertModalComponent, { initialState: {type: 'Sucesso!', message: mensagemSucesso, navegar: ir} });
            },error => {
              this.modalRef = this.modalService.show(AlertModalComponent, {  initialState: {type: 'Erro!', message: mensagemErro, navegar: ir}  });
            }
          )
        }
      })
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


  formatarDataParaString(data: Date): string {
    const mes = ('0' + (data.getMonth() + 1)).slice(-2);
    const dia = ('0' + data.getDate()).slice(-2);
    const ano = data.getFullYear();
    return `${mes}/${dia}/${ano}`;
  }

  formatarHoraParaString(tempo: Date): string {
    const horas = ('0' + tempo.getHours()).slice(-2);
    const minutos = ('0' + tempo.getMinutes()).slice(-2);
    return `${horas}:${minutos}`;
  }
}
