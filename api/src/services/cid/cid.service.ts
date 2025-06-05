import { Injectable } from '@nestjs/common';
import { PrismaErrorHandler } from 'src/handlers/prisma-error-handler';
import PrismaSingleton from 'src/singletons/prisma-singleton/prisma-singleton';

@Injectable()
export class CidService {
  #database = PrismaSingleton.instance.client;
  async findAll() {
    try {
      const databaseData = this.#database.cid.findMany();
      return databaseData;
    } catch (error) {
      new PrismaErrorHandler(error).handle();
    }
  }
}
