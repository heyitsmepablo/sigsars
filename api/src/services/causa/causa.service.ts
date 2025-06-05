import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { PrismaErrorHandler } from 'src/handlers/prisma-error-handler';
import PrismaSingleton from 'src/singletons/prisma-singleton/prisma-singleton';

@Injectable()
export class CausaService {
  #database = PrismaSingleton.instance.client;
  async findAll() {
    try {
      const databaseData = this.#database.causa.findMany();
      return databaseData;
    } catch (error) {
      new PrismaErrorHandler(error).handle();
    }
  }
}
