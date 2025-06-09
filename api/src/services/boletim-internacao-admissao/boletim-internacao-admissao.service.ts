import { Injectable } from '@nestjs/common';
import { BoletimInternacaoAdmissaoServiceCreateArgs } from 'src/dtos/boletim-internacao-admissao.dto';
import { PrismaErrorHandler } from 'src/handlers/prisma-error-handler';
import PrismaSingleton from 'src/singletons/prisma-singleton/prisma-singleton';

@Injectable()
export class BoletimInternacaoAdmissaoService {
  #database = PrismaSingleton.instance.client;
  async create(data: BoletimInternacaoAdmissaoServiceCreateArgs) {
    const { boletim, items } = data;
    try {
      await this.#database.boletim_internacao_admissao.create({
        data: {
          ...boletim,
          boletim_admissao_internacao_item: { create: items },
        },
      });
      return { message: 'success' };
    } catch (error) {
      new PrismaErrorHandler(error).handle();
    }
  }
}
