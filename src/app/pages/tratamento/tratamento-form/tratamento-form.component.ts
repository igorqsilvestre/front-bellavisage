import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { catchError, map, of } from 'rxjs';

import { FormUtilsService } from '../../../shared/services/form-utils.service';
import { Tratamento } from '../Tratamento';
import { TratamentoService } from '../tratamento.service';


@Component({
  selector: 'app-tratamento-form',
  templateUrl: './tratamento-form.component.html',
  styleUrl: './tratamento-form.component.css'
})
export class TratamentoFormComponent implements OnInit{
  formulario!: FormGroup;
  titulo:string = 'Cadastro do tratamento';
  nomeBotao:string = 'Cadastrar';
  iconeCarregarImagemOuImagemSelecionada = 'pi pi-upload';
  labelParaCarregamentoImagemOuImagemJaSelecionada = 'Escolha uma foto para o tratamento';

  constructor(
    public formUtilService: FormUtilsService,
    private formBuilder: FormBuilder,
    private tratamentoService: TratamentoService,
    private route: ActivatedRoute,
    private messageService: MessageService
  ){}


  ngOnInit(): void {

    const tratamento: Tratamento = this.route.snapshot.data['tratamento'];

    if(tratamento.id){
      this.titulo = 'Editar tratamento';
      this.nomeBotao = 'Atualizar';
      tratamento.valor = parseFloat(tratamento.valor.toString().replaceAll(',','').split('.')[0]) ;
    }

    this.formulario = this.formBuilder.group({
      id:[tratamento.id],
      nome: [tratamento.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(255)], [this.validarTratamentoExiste.bind(this)]],
      valor: [tratamento.valor, [Validators.required, Validators.pattern(this.formUtilService.patternPermiteSomenteNumeros)]],
      descricao: [tratamento.descricao, Validators.required],
      funcionamento: [tratamento.descricao, Validators.required],
      indicacoes: [tratamento.descricao, Validators.required],
      imagem: [tratamento.imagem, Validators.required],
    });

    this.verificaSeImagemEstaCarregada(tratamento);
  }

  onSubmit(){
    if (this.formulario.valid) {
      let mensagemSucesso = "Cadastro foi realizado com sucesso!";
      let mensagemErro = "Ocorreu um erro ao realizar o cadastro!"

      if(this.formulario.value.id){
        mensagemSucesso = "Alteração realizada com sucesso!"
        mensagemErro = "Ocorreu um erro ao realizar a edição!"
      }

      this.tratamentoService.salvar(this.formulario.value).subscribe(
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
  }



  onUpload(event: { files: File[] }) { // Especifica o tipo correto
    const file = event.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
            // Captura a string Base64, que inclui o prefixo
            const base64Image = e.target.result; // Isso será algo como "data:image/jpeg;base64,..."
            this.formulario.get('imagem')?.setValue(base64Image); // Define o valor no formulário
        };
        reader.readAsDataURL(file); // Lê o arquivo como URL de dados
    }
  }

  verificaSeImagemEstaCarregada(tratamento:Tratamento) {
   if(tratamento.imagem){
    this.iconeCarregarImagemOuImagemSelecionada = 'pi pi-image';
    this.labelParaCarregamentoImagemOuImagemJaSelecionada = 'Imagem Carregada';
   }
  }

  validarTratamentoExiste(formControl: FormControl) {
    const registro = formControl.value;
    const id = formControl.root.get('id')?.value;
    return this.tratamentoService.verificarExisteNomeCadastrado(registro)
      .pipe(
        map(tratamento => tratamento && tratamento.id !== id ? { tratamentoExistente: true } : null),
        catchError(() => of(null))
      );
  }

  mostrarMensagemErro(mensagem: string) {
    this.messageService.add({ severity: 'error', summary: 'Erro', detail: mensagem, key: 'toast-error' });
  }

  mostrarMensagemSucesso(mensagem: string){
    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: mensagem, key: 'toast-sucess'});
  }

}


