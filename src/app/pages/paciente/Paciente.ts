export interface Paciente {
  id:number
  cpf:string;
  nome:string;
  email:string;
  telefone:string;
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
