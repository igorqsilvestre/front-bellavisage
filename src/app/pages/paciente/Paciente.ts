export interface Paciente {
  id:number
  cpf:string;
  nome:string;
  email:string;
  senha: string;
  telefone:string;
  dataNascimento: Date;
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
