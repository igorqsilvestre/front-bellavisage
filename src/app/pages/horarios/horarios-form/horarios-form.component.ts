import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
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
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AddHorarioModalComponent } from '../../../shared/modals/addHorario-modal/addHorario-modal.component';


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
  modalRef!: BsModalRef;

  constructor(
    public formUtilService: FormUtilsService,
    private formBuilder: FormBuilder,
    private horarioService: HorariosService,
    private tratamentoService: TratamentoService,
    private especialistaService: EspecialistaService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private modalService: BsModalService
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
      data: [horario.data, [Validators.required, this.validaDataMenorQueAtual()]],
      disponibilidade: [true],
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

  onAddHorario(){
    if (this.formulario.valid) {
      const data = this.formulario.get('data').value;

      let mensagemSucesso = "Cadastro foi realizado com sucesso!";
      let mensagemErro = "Ocorreu um erro ao realizar o cadastro!"


      this.modalRef = this.modalService.show(AddHorarioModalComponent, {
        initialState: {
          type: 'Adicionar horario para o especialista',
          data
        }
      });

      this.modalRef.content.confirm.subscribe((data:Date) => {
        if(data){
          this.formulario.patchValue({data});
          this.horarioService.salvar(this.formulario.value).subscribe(
            () => {
              this.mostrarMensagemSucesso(mensagemSucesso);
              this.formUtilService.voltarPagina(2000);
            },() => {
              this.mostrarMensagemErro(mensagemErro);
            }
          );
        }
      });

      /*
      this.modalRef.content.confirm.subscribe(() => {
        this.especialistaService.excluir(especialista.id).subscribe(
          () => {
            this.atualizarLista();
          },
          error => {
            this.modalRef = this.modalService.show(AlertModalComponent, { initialState: { type: 'Erro!', message: 'Erro ao excluir especialista!' } });
          }
        );
      });*/
    }else{
      this.formUtilService.marcarCamposInvalidosComoTocado(this.formulario);
    }
  }

  cancelarCadastro(horariosEspecialista: Date){
    console.log("Cancelamento do horário");
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
