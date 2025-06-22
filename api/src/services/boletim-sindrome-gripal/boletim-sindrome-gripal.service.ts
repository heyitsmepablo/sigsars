import { Injectable, UseGuards } from '@nestjs/common';

import { BoletimSindromeGripalServiceCreateArgs } from 'src/dtos/boletim-sindrome-gripal.dto';

import { PrismaErrorHandler } from 'src/handlers/prisma-error-handler';
import PrismaSingleton from 'src/singletons/prisma-singleton/prisma-singleton';

@Injectable()
export class BoletimSindromeGripalService {
  #db = PrismaSingleton.instance.client;
  async create(data: BoletimSindromeGripalServiceCreateArgs) {
    try {
      await this.#db.boletim_sindrome_gripal.create({ data });
      return { message: 'success' };
    } catch (error) {
      new PrismaErrorHandler(error).handle();
    }
  }
  async findAll() {
    try {
      return await this.#db.boletim_sindrome_gripal.findMany({
        select: {
          id: true,
          unidade: { select: { id: true, nome: true } },
          usuario: { omit: { usuario_tipo_id: true } },
          criado_em: true,
          atualizado_em: true,
        },
      });
    } catch (error) {
      new PrismaErrorHandler(error).handle();
    }
  }
  async findOne(options: { where: { id: number } }) {
    try {
      return await this.#db.boletim_sindrome_gripal.findUnique({
        where: options.where,
        include: {
          usuario: { select: { nome: true, cargo: true, matricula: true } },
        },
      });
    } catch (error) {
      new PrismaErrorHandler(error).handle();
    }
  }
}
