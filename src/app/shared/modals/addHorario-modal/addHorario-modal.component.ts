import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormUtilsService } from '../../services/form-utils.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-addHorario-modal',
  templateUrl: './addHorario-modal.component.html',
  styleUrls: ['./addHorario-modal.component.css']
})
export class AddHorarioModalComponent implements OnInit {
  @Input() type: string = '';
  @Input() data: Date = null;
  @Output() confirm: EventEmitter<Date> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();
  formulario!: FormGroup;

  constructor(
    public bsModalRef: BsModalRef,
    private formBuilder: FormBuilder,
    public formUtilService: FormUtilsService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      horario: [null, Validators.required]
    })
  }



  onConfirm(): void {
    if(this.formulario.valid){
      const dataHorario = this.combinarDataEHorario(this.data, this.formulario.get('horario').value);
      this.confirm.emit(dataHorario);
      this.bsModalRef.hide();
    }else{
      this.formUtilService.marcarCamposInvalidosComoTocado(this.formulario);
    }
  }

  onCancel(): void {
    this.cancel.emit();
    this.bsModalRef.hide();
  }

  private combinarDataEHorario(data: Date, horario: Date): Date {
    // Extrai a data (ano, mês, dia) do objeto `date`
   const ano = data.getFullYear();
   const mes = data.getMonth();
   const dia = data.getDate();

   // Extrai o horário (horas, minutos, segundos, milissegundos) do objeto `time`
   const horas = horario.getHours();
   const minutos = horario.getMinutes();
   const segundos = horario.getSeconds();
   const millisegundos = horario.getMilliseconds();

   // Cria um novo `Date` com a data e horário combinados
   return new Date(ano, mes, dia, horas, minutos, segundos, millisegundos);
 }

 mostrarMensagemErro(mensagem: string) {
  this.messageService.add({ severity: 'error', summary: 'Erro', detail: mensagem, key: 'toast-error' });
}

mostrarMensagemSucesso(mensagem: string){
  this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: mensagem, key: 'toast-sucess'});
}
}


