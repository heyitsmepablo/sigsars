import { Injectable } from '@nestjs/common';
import { UnidadeWhereQueryDto } from 'src/dtos/unidade.dto';
import { PrismaErrorHandler } from 'src/handlers/prisma-error-handler';
import PrismaSingleton from 'src/singletons/prisma-singleton/prisma-singleton';

@Injectable()
export class UnidadeService {
  #database = PrismaSingleton.instance.client;
  async findAll(where?: UnidadeWhereQueryDto) {
    try {
      const data = await this.#database.unidade.findMany({
        select: {
          id: true,
          nome: true,
          unidade_tipo_id: true,
          criado_em: true,
          atualizado_em: true,
        },
        where,
      });
      return data;
    } catch (error) {
      new PrismaErrorHandler(error).handle();
    }
  }
}
