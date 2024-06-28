import { PacienteService } from './../paciente.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, EmailValidator } from '@angular/forms';
import { EstadoBr } from '../../../shared/models/estado-br';
import { Subject, takeUntil } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DropdownService } from '../../../shared/services/dropdown.service';
import { CpfValidator } from '../CpfValidator';
import { AlertModalComponent } from '../../../shared/alert-modal/alert-modal.component';
import { CpfExists } from '../CpfExists';
import { ActivatedRoute } from '@angular/router';
import { Paciente } from '../Paciente';


@Component({
  selector: 'app-paciente-form',
  templateUrl: './paciente-form.component.html',
  styleUrl: './paciente-form.component.css'
})
export class PacienteFormComponent implements OnInit{

  formulario!: FormGroup;
  estados!: EstadoBr[];
  modalRef!: BsModalRef;
  titulo:string = 'Cadastro do paciente';
  nomeBotao:string = 'Cadastrar';


  constructor(
    private formBuilder: FormBuilder,
    private dropdownService: DropdownService,
    private modalService: BsModalService,
    private pacienteService: PacienteService,
    private cpfExists: CpfExists,
    private route: ActivatedRoute){}


  ngOnInit(): void {
    this.dropdownService.getEstadosBr().subscribe(dados => {this.estados = dados});
    this.formulario = this.formBuilder.group({
      id:[null],
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      cpf: [null, {
        validators: [Validators.required, CpfValidator.validate()],
        asyncValidators: [this.cpfExists.validate.bind(this.cpfExists)],
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
      this.titulo = 'Editar paciente';
      this.nomeBotao = 'Atualizar';
      this.pacienteService.obterPaciente(Number(this.route.snapshot.paramMap.get('id'))).subscribe(
        dados => {if(dados) this.onUpdate(dados)}
      )
    }
  }

  onUpdate(paciente:Paciente){
    this.formulario.patchValue({
      id: paciente.id,
      nome: paciente.nome,
      cpf: paciente.cpf,
      email: paciente.email,
      telefone: paciente.telefone,
      endereco: {
        cep: paciente.endereco.cep,
        numero: paciente.endereco.numero,
        complemento: paciente.endereco.complemento,
        rua: paciente.endereco.rua,
        cidade: paciente.endereco.cidade,
        estado: paciente.endereco.estado
      }
    })
  }

  onSubmit(){
    if (this.formulario.valid) {
      let mensagemSucesso = "Cadastro foi realizado com sucesso!";
      let mensagemErro = "Ocorreu um erro ao realizar o cadastro!"
      const ir =  {estado: true, url: 'pacientes'};

      if(this.formulario.value.id){
        mensagemSucesso = "Alteração realizada com sucesso!"
        mensagemErro = "Ocorreu um erro ao realizar a edição!"
      }
      this.pacienteService.salvar(this.formulario.value).subscribe(
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
