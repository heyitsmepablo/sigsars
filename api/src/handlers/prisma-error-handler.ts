import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '../../generated/prisma/runtime/library';

export class PrismaErrorHandler {
  constructor(private error: any) {}

  handle(): never {
    if (this.error instanceof PrismaClientKnownRequestError) {
      console.error(this.error);
      switch (this.error.code) {
        case 'P2002': {
          const meta = this.error.meta as { target?: string[] | undefined };
          const target = Array.isArray(meta?.target)
            ? meta.target.join(', ')
            : 'campo único desconhecido';

          throw new InternalServerErrorException({
            message: `Já existe um registro com o valor informado para o(s) campo(s) único(s)`,
            fields: target,
          });
        }
        case 'P2025': {
          throw new NotFoundException({
            message: `Registro não encontrado`,
          });
        }
      }
    }
    throw this.error;
  }
}
