import { Injectable } from '@nestjs/common';
import { PrismaErrorHandler } from 'src/handlers/prisma-error-handler';
import PrismaSingleton from 'src/singletons/prisma-singleton/prisma-singleton';

@Injectable()
export class UnidadesService {
  #database = PrismaSingleton.instance.client;
  async findAll() {
    try {
      const data = await this.#database.unidades.findMany({
        select: {
          id: true,
          nome: true,
          tipo_unidade_id: true,
          criado_em: true,
          atualizado_em: true,
        },
      });
      return data;
    } catch (error) {
      new PrismaErrorHandler(error).handle();
    }
  }
}
