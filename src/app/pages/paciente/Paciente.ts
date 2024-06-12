export interface Paciente {
  cpf:string;
  nome:string;
  email:string;
  telefone:string;
  endereco: {
    cep:string;
    logradouro:string;
    rua:string;
    numero:number;
    complemento:string;
    cidade:string;
    estado:string;
  }
}
