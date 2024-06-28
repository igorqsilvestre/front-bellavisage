import { NomeExists } from './../nomeExists';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TratamentoService } from '../tratamento.service';
import { Tratamento } from '../Tratamento';
import { AlertModalComponent } from '../../../shared/alert-modal/alert-modal.component';


@Component({
  selector: 'app-tratamento-form',
  templateUrl: './tratamento-form.component.html',
  styleUrl: './tratamento-form.component.css'
})
export class TratamentoFormComponent implements OnInit{
  formulario!: FormGroup;
  modalRef!: BsModalRef;
  titulo:string = 'Cadastro do tratamento';
  nomeBotao:string = 'Cadastrar';

  constructor(
    private formBuilder: FormBuilder,
    private modalService: BsModalService,
    private tratamentoService: TratamentoService,
    private nomeExiste: NomeExists,
    private route: ActivatedRoute){}


  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      id:[null],
      nome: [null, {
        validators:[Validators.required, Validators.minLength(3), Validators.maxLength(255)],
        asyncValidators: [this.nomeExiste.validate.bind(this.nomeExiste)],
        updateOn: 'blur'
      }],
      valor: [null, [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      descricao: [null, Validators.required],
      imagem: [null],
    });

    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.titulo = 'Editar especialista';
      this.nomeBotao = 'Atualizar';
      this.tratamentoService.obterTratamento(Number(this.route.snapshot.paramMap.get('id'))).subscribe(
        dados => {if(dados) this.onUpdate(dados)}
      )
    }
  }

  onUpdate(tratamento:Tratamento){
    this.formulario.patchValue({
      id: tratamento.id,
      nome: tratamento.nome,
      valor: tratamento.valor.toString().replaceAll(',','').split('.')[0],
      descricao: tratamento.descricao,
      imagem: tratamento.imagem,
    })
  }

  onSubmit(){
    if (this.formulario.valid) {
      let mensagemSucesso = "Cadastro foi realizado com sucesso!";
      let mensagemErro = "Ocorreu um erro ao realizar o cadastro!"
      const ir =  {estado: true, url: 'tratamentos'};

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
