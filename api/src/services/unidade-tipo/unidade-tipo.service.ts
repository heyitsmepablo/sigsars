import { Injectable } from '@nestjs/common';
import { PrismaErrorHandler } from 'src/handlers/prisma-error-handler';
import PrismaSingleton from 'src/singletons/prisma-singleton/prisma-singleton';

@Injectable()
export class UnidadeTipoService {
  #databbase = PrismaSingleton.instance.client;

  async findAll() {
    try {
      const databaseResponse = this.#databbase.unidade_tipo.findMany();
      return databaseResponse;
    } catch (error) {
      new PrismaErrorHandler(error).handle();
    }
  }
}
