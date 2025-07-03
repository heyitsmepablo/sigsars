import { Prisma } from 'generated/prisma';

export class JwTPayload implements Prisma.usuarioGetPayload<true> {
  id: string;
  usuario_tipo_id: number;
  matricula: string;
  unidade_lotada_id: number;
  cargo: string;
  nome: string;
  cpf: string;
  email: string | null;
  criado_em: Date | null;
  atualizado_em: Date | null;
}
