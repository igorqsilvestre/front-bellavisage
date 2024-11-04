export interface Especialista {
  id:number
  nome:string;
  especialidade:string;
  registro:string;
  email:string;
  telefone:string;
  dataNascimento:Date;
  endereco: {
    cep:string;
    logradouro:string;
    bairro:string;
    numero:number;
    complemento:string;
    cidade:string;
    estado:string;
  }
}
