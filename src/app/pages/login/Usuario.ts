export interface Usuario {
  senha: string;
  perfilAcesso: string;
  nome: string;
  email: string;
  telefone: string;
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
