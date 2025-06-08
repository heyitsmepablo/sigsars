export class UsuarioServiceFindOneWhereArg {
  id?: string;
  cpf?: string;
  matricula?: string;
}

export class UsuarioServiceCreateData {
  usuario_tipo_id: number;
  nome: string;
  cargo: string;
  senha: string;
  matricula: string;
  email: string;
  cpf: string;
}
