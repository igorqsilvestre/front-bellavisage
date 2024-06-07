export interface Usuario {
  senha: string;
  perfilAcesso: string;
  nome: string;
  email: string;
  telefone: string;
  endereco: {
    cep: number;
    logradouro: string;
    rua: string;
    numero: number;
    complemento: string;
    cidade: string;
    estado: string;
  }
}
