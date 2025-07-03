export class UsuarioServiceFindOneWhereArg {
  id?: string;
  cpf?: string;
  matricula?: string;
}

export class UsuarioDecoratorPayload {
  id: string;
  usuario_tipo: { id: number; nome: string };
  unidade: { id: number; nome: string; sigla: string };
  matricula: string;
  cargo: string;
  nome: string;
  cpf: string;
  email: string;
  criado_em: Date | null;
  atualizado_em: Date | null;
}
