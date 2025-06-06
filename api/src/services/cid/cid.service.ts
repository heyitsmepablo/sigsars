import { Injectable } from '@nestjs/common';
import { CidServiceOptionsDto } from 'src/dtos/cid.dto';
import { PrismaErrorHandler } from 'src/handlers/prisma-error-handler';
import PrismaSingleton from 'src/singletons/prisma-singleton/prisma-singleton';

@Injectable()
export class CidService {
  #database = PrismaSingleton.instance.client;
  async findAll(options?: CidServiceOptionsDto) {
    try {
      const databaseData = await this.#database.cid.findMany({
        where: options?.where,
        take: options?.take,
        skip: options?.skip,
      });
      return databaseData;
    } catch (error) {
      new PrismaErrorHandler(error).handle();
    }
  }
}
