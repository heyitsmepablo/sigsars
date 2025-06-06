import { Injectable } from '@nestjs/common';
import { PrismaErrorHandler } from 'src/handlers/prisma-error-handler';
import PrismaSingleton from 'src/singletons/prisma-singleton/prisma-singleton';

@Injectable()
export class CidSragService {
  #database = PrismaSingleton.instance.client;
  async findAll() {
    try {
      const databaseData = this.#database.cid_srag.findMany({
        select: { id: true, cid: true, criado_em: true, atualizado_em: true },
      });
      return databaseData;
    } catch (error) {
      new PrismaErrorHandler(error).handle();
    }
  }
}
