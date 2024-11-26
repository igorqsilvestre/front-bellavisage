import { TratamentoService } from './../../tratamento/tratamento.service';
import { Component, OnInit } from '@angular/core';
import { Horario } from '../Horario';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { faMagnifyingGlass, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { HorariosService } from '../horarios.service';
import { Tratamento } from '../../tratamento/Tratamento';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { FormUtilsService } from '../../../shared/services/form-utils.service';
import { ConfirmModalComponent } from '../../../shared/modals/confirm-modal/confirm-modal.component';
import { AlertModalComponent } from '../../../shared/modals/alert-modal/alert-modal.component';

@Component({
  selector: 'app-listagem-horario',
  templateUrl: './listagem-horario.component.html',
  styleUrl: './listagem-horario.component.css'
})
export class ListagemHorarioComponent implements OnInit{

  formulario!: FormGroup;
  tratamentos!: Tratamento[];
  horarios: Horario[] = [];
  modalRef!: BsModalRef;
  faMagnifyingGlass = faMagnifyingGlass;
  faTrash = faTrash;


  constructor(
    private tratamentoService:TratamentoService,
    private horarioService:HorariosService,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    public formUtilService: FormUtilsService,
  ) {}


  ngOnInit(): void {

    this.formulario = this.formBuilder.group({
      tratamento: [null, Validators.required],
      data: [null, [Validators.required]],
    });

    this.atualizarListaTratamentos();
  }



  onCarregarHorarios(){
    if(this.formulario.valid){
      const idTratamento = this.formulario.get('tratamento').value;
      const data = this.formulario.get('data').value;

      this.horarioService.obterTodosApartirtratamentoEData(idTratamento,data).subscribe((dados:Horario[]) => {
        if(dados){
          this.horarios = dados;
        }}
      );

    }else{
      this.formUtilService.marcarCamposInvalidosComoTocado(this.formulario);
    }
  }


  applyFilterOnTable(event: any, dtListagemEspecialista: any) {
    return dtListagemEspecialista.filterGlobal(event, 'contains')
  }

  cancelarCadastro(horario: Horario) {

    this.modalRef = this.modalService.show(ConfirmModalComponent, {
      initialState: {
        type: 'Confirmação',
        message: 'Deseja realmente excluir?'
      }
    });

    this.modalRef.content.confirm.subscribe(() => {
      this.horarioService.excluir(horario.id).subscribe(
        () => {
          this.onCarregarHorarios();
        },
        error => {
          this.modalRef = this.modalService.show(AlertModalComponent, { initialState: { type: 'Erro!', message: 'Erro ao excluir horario! Pois ja existe vinculo com agendamento' } });
        }
      );
    });

  }

  atualizarListaTratamentos() {
    this.tratamentoService.obterTodos().subscribe(dados => {
      if(dados) {
        this.tratamentos = dados
        this.formulario.patchValue({ tratamento: dados[0].id });
      }
    });
  }
}
