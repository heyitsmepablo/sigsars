import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { PrismaErrorHandler } from 'src/handlers/prisma-error-handler';
import PrismaSingleton from 'src/singletons/prisma-singleton/prisma-singleton';

@Injectable()
export class CausaSragService {
  #database = PrismaSingleton.instance.client;
  async findAll() {
    try {
      const prismaArgs: Prisma.causa_sragFindManyArgs = {
        select: { id: true, causa: {}, criado_em: true, atualizado_em: true },
      };
      const databaseData = this.#database.causa_srag.findMany(prismaArgs);
      return databaseData;
    } catch (error) {
      new PrismaErrorHandler(error).handle();
    }
  }
}
