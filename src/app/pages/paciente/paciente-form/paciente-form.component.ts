import { PacienteService } from './../paciente.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, EmailValidator } from '@angular/forms';
import { EstadoBr } from '../../../shared/models/estado-br';
import { Subscription } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DropdownService } from '../../../shared/services/dropdown.service';
import { CpfValidator } from '../CpfValidator';
import { AlertModalComponent } from '../../../shared/alert-modal/alert-modal.component';
import { CpfExists } from '../CpfExists';


@Component({
  selector: 'app-paciente-form',
  templateUrl: './paciente-form.component.html',
  styleUrl: './paciente-form.component.css'
})
export class PacienteFormComponent {


  formulario!: FormGroup;
  estados!: EstadoBr[];
  private estadosSubscription!: Subscription;
  private pacientesSubscription!: Subscription;
  modalRef!: BsModalRef;


  constructor(
    private formBuilder: FormBuilder,
    private dropdownService: DropdownService,
    private modalService: BsModalService,
    private pacienteService: PacienteService,
    private cpfExists: CpfExists){}



  ngOnInit(): void {
    this.estadosSubscription = this.dropdownService.getEstadosBr().subscribe(dados => {this.estados = dados});

    this.formulario = this.formBuilder.group({
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
  }

  onSubmit(){

    if (this.formulario.valid) {
      this.pacientesSubscription = this.pacienteService.criarPaciente(this.formulario.value).subscribe(
        dados => {
          const initialState = {
            type: 'Sucesso!',
            message: 'Cadastro foi realizado com sucesso!',
          };
          this.modalRef = this.modalService.show(AlertModalComponent, { initialState });
          this.formulario.reset();
        },error => {
          const initialState = {
            type: 'Erro!',
            message: 'Ocorreu um erro ao realizar o cadastro.!'
          };
          this.modalRef = this.modalService.show(AlertModalComponent, { initialState });
          this.formulario.reset();
        },
      );
    }
  }

  ngOnDestroy(): void {
    if(this.estadosSubscription){
      this.estadosSubscription.unsubscribe();
    }
    if(this.pacientesSubscription){
      this.estadosSubscription.unsubscribe();
    }
  }
}
