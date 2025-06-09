import { Prisma } from 'generated/prisma';

export class JwTPayload implements Prisma.usuarioGetPayload<true> {
  id: string;
  usuario_tipo_id: number;
  matricula: string;
  cargo: string;
  nome: string;
  cpf: string;
  email: string | null;
  criado_em: Date | null;
  atualizado_em: Date | null;
}
