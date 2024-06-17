import { AgendamentoService } from './../agendamento.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TratamentoService } from './../../tratamento/tratamento.service';
import { EspecialistaService } from './../../especialista/especialista.service';
import { PacienteService } from './../../paciente/paciente.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { Time } from '@angular/common';
import { Subscription } from 'rxjs';
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
export class AgendamentoComponent implements OnInit, OnDestroy{
  formulario!: FormGroup;
  modalRef!: BsModalRef;
  private pacienteSubscription!: Subscription;
  private especialistaSubscription!: Subscription;
  private tratamentoSubscription!: Subscription;
  private agendamentoSubscription!: Subscription;
  pacientes!: Paciente[];
  especialistas!: Especialista[];
  tratamentos!: Tratamento[];
  titulo:string = 'Agendamento do Paciente';
  nomeBotao:string = 'Agendar';
  faMagnifyingGlass = faMagnifyingGlass;


   date: Date;
   time: Time;

  constructor(private route: ActivatedRoute,
    private pacienteService:PacienteService,
    private especialistaService:EspecialistaService,
    private tratamentoService:TratamentoService,
    private formBuilder:FormBuilder,
    private modalService: BsModalService,
    private AgendamentoService: AgendamentoService) {}



  ngOnInit(): void {
    this.pacienteSubscription = this.pacienteService.obterPacientes().subscribe(dados => {if(dados) this.pacientes = dados});
    this.especialistaSubscription = this.especialistaService.obterEspecialistas().subscribe(dados => {if(dados) this.especialistas = dados});
    this.tratamentoSubscription = this.tratamentoService.obterTratamentos().subscribe(dados => {if(dados) this.tratamentos = dados});

    this.formulario = this.formBuilder.group({
      id:[null],
      pacientes: [null, Validators.required],
      especialistas: [null, Validators.required],
      tratamentos: [null, Validators.required],
      data: [null, Validators.required],
      hora: [null, Validators.required],
      valor: [null, Validators.required]
    });

    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.titulo = 'Editar agendamento do especialista';
      this.nomeBotao = 'Atualizar';
      this.agendamentoSubscription = this.AgendamentoService.obterAgendamento(Number(this.route.snapshot.paramMap.get('id'))).subscribe(
        dados => {if(dados) this.onUpdate(dados)}
      )
    }
  }


  onUpdate(agendamento:Agendamento){
    this.formulario.patchValue({
      id:agendamento.id,
      pacientes: agendamento.pacientes,
      especialistas: agendamento.especialistas,
      tratamentos: agendamento.tratamentos,
      data: agendamento.data,
      hora: agendamento.hora,
      valor: agendamento.valor
    })
  }

  /*
  cadastro = [
    {
      id: 1,
      data:'25/06/2024',
      horas: '14:00',
      nome: 'Maria Eduarda',
      tratamento: 'Carboxiterapia',
      especialista: 'Dr. Margarida Eduarda',
      valor: 120.00,
      status: 'Aberto',
    },
    {
      id: 2,
      data:'05/06/2024',
      horas: '16:00',
      nome: 'Carlos Eduardo de Souza',
      tratamento: 'Criolipólise',
      especialista: 'Dr. Paulo Henrique Cabral',
      valor: 120.00,
      status: 'Concluído',
    },
    {
      id: 3,
      data:'07/06/2024',
      horas: '14:20',
      nome: 'Márcia Maria de Souza',
      tratamento: 'Drenagem Linfática',
      especialista: 'Dr.Lúcia Lane de Souza',
      valor: 300.00,
      status: 'Concluído',
    },
    {
      id: 4,
      data:'08/06/2024',
      horas: '11:00',
      nome: 'Carlos Eduardo de Souza',
      tratamento: 'carboxiterapia',
      especialista: 'Dr. Paulo Henrique Cabral',
      valor: 120.00,
      status: 'Concluído',
    },
    {
      id: 5,
      data:'29/06/2024',
      horas: '15:00',
      nome: 'Flávia Couto Magalhães',
      tratamento: 'Pelling Químico',
      especialista: 'Dr. Margarida Eduarda',
      valor: 200.00,
      status: 'Aberto',
    }
  ]*/

  applyFilterOnTable(event: any, dtAgendamento: any) {
    console.log(event.target.value)
    return dtAgendamento.filterGlobal(event, 'contains')
  }

  onSubmit(){

    console.log(this.formulario.value)

    /*
    if (this.formulario.valid) {
      let mensagemSucesso = "Cadastro foi realizado com sucesso!";
      let mensagemErro = "Ocorreu um erro ao realizar o cadastro!"
      const ir =  {estado: true, url: 'agendamentos'};

      if(this.formulario.value.id){
        mensagemSucesso = "Alteração realizada com sucesso!"
        mensagemErro = "Ocorreu um erro ao realizar a edição!"
      }
      this.tratamentoService.salvar(this.formulario.value).subscribe(
        dados => {
          this.modalRef = this.modalService.show(AlertModalComponent, { initialState: {type: 'Sucesso!', message: mensagemSucesso, navegar: ir} });
        },error => {
          this.modalRef = this.modalService.show(AlertModalComponent, {  initialState: {type: 'Erro!', message: mensagemErro, navegar: ir}  });
        }
      )
    }*/
  }

  ngOnDestroy(): void {
    if(this.pacienteSubscription)this.pacienteSubscription.unsubscribe;
    if(this.especialistaSubscription)this.especialistaSubscription.unsubscribe;
    if(this.tratamentoSubscription)this.tratamentoSubscription.unsubscribe;
    if(this.agendamentoSubscription)this.agendamentoSubscription.unsubscribe;
  }
}
