import { NomeExists } from './../nomeExists';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { TratamentoService } from '../tratamento.service';
import { Tratamento } from '../Tratamento';
import { AlertModalComponent } from '../../../shared/alert-modal/alert-modal.component';


@Component({
  selector: 'app-tratamento-form',
  templateUrl: './tratamento-form.component.html',
  styleUrl: './tratamento-form.component.css'
})
export class TratamentoFormComponent {
  formulario!: FormGroup;
  modalRef!: BsModalRef;
  titulo:string = 'Cadastro do tratamento';
  nomeBotao:string = 'Cadastrar';
  private tratamentoSubscription!: Subscription;


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
      this.tratamentoSubscription = this.tratamentoService.obterTratamento(Number(this.route.snapshot.paramMap.get('id'))).subscribe(
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
    console.log(this.formulario.value);
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
    }
  }

  ngOnDestroy(): void {
    if(this.tratamentoSubscription){
      this.tratamentoSubscription.unsubscribe();
    }
  }
}
