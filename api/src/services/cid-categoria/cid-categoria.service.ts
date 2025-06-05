import { Injectable } from '@nestjs/common';
import { CidCategoriaWhereQueryDto } from 'src/dtos/cid-categoria.dto';
import { PrismaErrorHandler } from 'src/handlers/prisma-error-handler';
import PrismaSingleton from 'src/singletons/prisma-singleton/prisma-singleton';

@Injectable()
export class CidCategoriaService {
  #database = PrismaSingleton.instance.client;
  async findAll(options?: { where?: CidCategoriaWhereQueryDto }) {
    try {
      const databaseData = this.#database.cid_categoria.findMany({
        where: options?.where,
      });
      return databaseData;
    } catch (error) {
      new PrismaErrorHandler(error).handle();
    }
  }
}
