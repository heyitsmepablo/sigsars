import { Injectable } from '@nestjs/common';
import { AcessoServiceFindOneWhereArg } from 'src/dtos/acesso.dto';
import { PrismaErrorHandler } from 'src/handlers/prisma-error-handler';
import PrismaSingleton from 'src/singletons/prisma-singleton/prisma-singleton';

@Injectable()
export class AcessoService {
  #database = PrismaSingleton.instance.client;
  async findOne(where: AcessoServiceFindOneWhereArg) {
    try {
      const { usuario_id } = where;
      if (usuario_id) {
        return await this.#database.acesso.findUniqueOrThrow({
          where: { usuario_id },
        });
      }
    } catch (error) {
      new PrismaErrorHandler(error).handle();
    }
  }
}
