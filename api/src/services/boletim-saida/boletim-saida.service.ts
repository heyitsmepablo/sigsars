import { Injectable } from '@nestjs/common';
import { BoletimInternacaoOcupacaoServiceCreateArgs } from 'src/dtos/boletim-internacao-ocupacao';
import { BoletimSaidaServiceCreateArgs } from 'src/dtos/boletim-saida.dto';
import { PrismaErrorHandler } from 'src/handlers/prisma-error-handler';
import PrismaSingleton from 'src/singletons/prisma-singleton/prisma-singleton';

@Injectable()
export class BoletimSaidaService {
  #database = PrismaSingleton.instance.client;
  async create(data: BoletimSaidaServiceCreateArgs) {
    const { boletim, items } = data;
    try {
      await this.#database.boletim_saida.create({
        data: {
          ...boletim,
          boletim_saida_item: { create: items },
        },
      });
      return { message: 'success' };
    } catch (error) {
      new PrismaErrorHandler(error).handle();
    }
  }
}
