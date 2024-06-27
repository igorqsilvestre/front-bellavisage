import { RegistroExists } from './../registroExists';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { EstadoBr } from '../../../shared/models/estado-br';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DropdownService } from '../../../shared/services/dropdown.service';
import { EspecialistaService } from '../especialista.service';
import { ActivatedRoute } from '@angular/router';
import { Especialista } from '../Especialista';
import { AlertModalComponent } from '../../../shared/alert-modal/alert-modal.component';

@Component({
  selector: 'app-especialista-form',
  templateUrl: './especialista-form.component.html',
  styleUrl: './especialista-form.component.css'
})
export class EspecialistaFormComponent implements OnInit{

  formulario!: FormGroup;
  estados!: EstadoBr[];
  modalRef!: BsModalRef;
  titulo:string = 'Cadastro do especialista';
  nomeBotao:string = 'Cadastrar';

  constructor(
    private formBuilder: FormBuilder,
    private dropdownService: DropdownService,
    private modalService: BsModalService,
    private especialistaService: EspecialistaService,
    private registroExists: RegistroExists,
    private route: ActivatedRoute){}


  ngOnInit(): void {
    this.dropdownService.getEstadosBr().subscribe(dados => {this.estados = dados});
    this.formulario = this.formBuilder.group({
      id:[null],
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      especialidade: [null, Validators.required],
      registro: [null, {
        validators: [Validators.required, Validators.pattern(/^[0-9]*$/)],
        asyncValidators: [this.registroExists.validate.bind(this.registroExists)],
        updateOn: 'blur'
      }],
      email: [null, [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      telefone: [null, [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern(/^[0-9]*$/)]],
      endereco: this.formBuilder.group({
        cep: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(8),Validators.pattern(/^[0-9]*$/)]],
        numero: [null, Validators.pattern(/^[0-9]*$/)],
        complemento: [null],
        rua: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: ['Acre', Validators.required]
      }),
    });

    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.titulo = 'Editar especialista';
      this.nomeBotao = 'Atualizar';
      this.especialistaService.obterEspecialista(Number(this.route.snapshot.paramMap.get('id'))).subscribe(
        dados => {if(dados) this.onUpdate(dados)}
      )
    }
  }

  onUpdate(especialista:Especialista){
    this.formulario.patchValue({
      id: especialista.id,
      nome: especialista.nome,
      especialidade: especialista.especialidade,
      registro: especialista.registro,
      email: especialista.email,
      telefone: especialista.telefone,
      endereco: {
        cep: especialista.endereco.cep,
        rua: especialista.endereco.rua,
        numero: especialista.endereco.numero,
        complemento: especialista.endereco.complemento,
        cidade: especialista.endereco.cidade,
        estado: especialista.endereco.estado
      }
    })
  }

  onSubmit(){

    if (this.formulario.valid) {
      let mensagemSucesso = "Cadastro foi realizado com sucesso!";
      let mensagemErro = "Ocorreu um erro ao realizar o cadastro!"
      const ir =  {estado: true, url: 'especialistas'};

      if(this.formulario.value.id){
        mensagemSucesso = "Alteração realizada com sucesso!"
        mensagemErro = "Ocorreu um erro ao realizar a edição!"
      }
      this.especialistaService.salvar(this.formulario.value).subscribe(
        dados => {
          this.modalRef = this.modalService.show(AlertModalComponent, { initialState: {type: 'Sucesso!', message: mensagemSucesso, navegar: ir} });
        },error => {
          this.modalRef = this.modalService.show(AlertModalComponent, {  initialState: {type: 'Erro!', message: mensagemErro, navegar: ir}  });
        }
      )
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
}
