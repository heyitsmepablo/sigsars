import { Injectable } from '@nestjs/common';
import { UsuarioServiceFindOneWhereArg } from 'src/dtos/usuario.dto';
import { PrismaErrorHandler } from 'src/handlers/prisma-error-handler';
import PrismaSingleton from 'src/singletons/prisma-singleton/prisma-singleton';

@Injectable()
export class UsuarioService {
  #database = PrismaSingleton.instance.client;
  // async create(data: UsuarioServiceCreateData) {
  //   const { senha, ...usuario } = data;
  //   try {
  //     return await this.#database.usuario.create({
  //       data: { ...usuario, acesso: { create: { senha } } },
  //     });
  //   } catch (error) {
  //     new PrismaErrorHandler(error).handle();
  //   }
  // }

  async findOne(where: UsuarioServiceFindOneWhereArg) {
    try {
      const { cpf, matricula, id } = where;

      if (cpf) {
        return this.#database.usuario.findUniqueOrThrow({
          where: { cpf },
        });
      }

      if (id) {
        return this.#database.usuario.findUniqueOrThrow({
          where: { id },
        });
      }

      return this.#database.usuario.findUniqueOrThrow({
        where: { matricula },
      });
    } catch (error) {
      new PrismaErrorHandler(error).handle();
    }
  }
}
