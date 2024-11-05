import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faMagnifyingGlass, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { TratamentoService } from '../../tratamento/tratamento.service';
import { ActivatedRoute } from '@angular/router';
import { FormUtilsService } from '../../../shared/services/form-utils.service';
import { EspecialistaService } from '../../especialista/especialista.service';
import { MessageService } from 'primeng/api';
import { HorariosService } from '../horarios.service';
import { Horario } from '../Horario';
import { Tratamento } from '../../tratamento/Tratamento';
import { Especialista } from '../../especialista/Especialista';


@Component({
  selector: 'app-horarios-form',
  templateUrl: './horarios-form.component.html',
  styleUrl: './horarios-form.component.css'
})
export class HorariosFormComponent implements OnInit{

  formulario!: FormGroup;
  titulo:string = 'Cadastro dos horários';
  nomeBotao:string = 'Cadastrar';
  especialistas!: Especialista[];
  tratamentos!: Tratamento[];
  horariosEspecialista: Date[] = [new Date(), new Date(), new Date];
  faMagnifyingGlass = faMagnifyingGlass;
  faTrash = faTrash;
  faPlus = faPlus;

  constructor(
    public formUtilService: FormUtilsService,
    private formBuilder: FormBuilder,
    private horarioService: HorariosService,
    private tratamentoService: TratamentoService,
    private especialistaService: EspecialistaService,
    private route: ActivatedRoute,
    private messageService: MessageService
  ){}


  ngOnInit(): void {

    const horario: Horario = this.route.snapshot.data['horarios'];

    if(horario.id){
      this.titulo = 'Editar horários';
      this.nomeBotao = 'Atualizar';
    }

    this.formulario = this.formBuilder.group({
      id:[horario.id],
      especialista: [horario.especialista,  Validators.required],
      tratamento: [horario.tratamento, Validators.required],
      data: [horario.data, Validators.required],
      horariosEspecialista: [horario.horariosEspecialista, Validators.required],
    });

    this.atualizaListaDeTratamentosEspecialista();

  }

  atualizaListaDeTratamentosEspecialista() {
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

  onSubmit(){
    if (this.formulario.valid) {
      let mensagemErro = '';
      let mensagemSucesso = '';

      mensagemSucesso = "Cadastro foi realizado com sucesso!";
      mensagemErro = "Ocorreu um erro ao realizar o cadastro!"

      if(this.formulario.value.id){
        mensagemSucesso = "Alteração realizada com sucesso!"
        mensagemErro = "Ocorreu um erro ao realizar a edição!"
      }

     /*
      this.agendamentoService.salvar(this.formulario.value).subscribe(
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
    */
    }
  }

  cancelarCadastro(horariosEspecialista: Date){
    console.log("Cancelamento do horário");
  }


  mostrarMensagemErro(mensagem: string) {
    this.messageService.add({ severity: 'error', summary: 'Erro', detail: mensagem, key: 'toast-error' });
  }

  mostrarMensagemSucesso(mensagem: string){
    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: mensagem, key: 'toast-sucess'});
  }

}
