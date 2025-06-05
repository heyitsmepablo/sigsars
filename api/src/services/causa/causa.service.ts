import { Injectable } from '@nestjs/common';
import { CausaWhereQueryDto } from 'src/dtos/causa.dto';
import { PrismaErrorHandler } from 'src/handlers/prisma-error-handler';
import PrismaSingleton from 'src/singletons/prisma-singleton/prisma-singleton';

@Injectable()
export class CausaService {
  #database = PrismaSingleton.instance.client;
  async findAll(options?: { where?: CausaWhereQueryDto }) {
    try {
      const databaseData = this.#database.causa.findMany({
        where: options?.where,
      });
      return databaseData;
    } catch (error) {
      new PrismaErrorHandler(error).handle();
    }
  }
}
