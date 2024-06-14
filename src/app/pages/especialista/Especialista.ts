export interface Especialista {
  id:number
  nome:string;
  especialidade:string;
  registro:string;
  email:string;
  telefone:string;
  endereco: {
    cep:string;
    rua:string;
    numero:number;
    complemento:string;
    cidade:string;
    estado:string;
  }
}
