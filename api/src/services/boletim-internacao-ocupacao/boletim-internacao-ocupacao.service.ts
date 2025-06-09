import { Injectable } from '@nestjs/common';
import { BoletimInternacaoAdmissaoServiceCreateArgs } from 'src/dtos/boletim-internacao-admissao.dto';
import { BoletimInternacaoOcupacaoServiceCreateArgs } from 'src/dtos/boletim-internacao-ocupacao';
import { PrismaErrorHandler } from 'src/handlers/prisma-error-handler';
import PrismaSingleton from 'src/singletons/prisma-singleton/prisma-singleton';

@Injectable()
export class BoletimInternacaoOcupacaoService {
  #database = PrismaSingleton.instance.client;
  async create(data: BoletimInternacaoOcupacaoServiceCreateArgs) {
    try {
      await this.#database.boletim_internacao_ocupacao.create({
        data,
      });
      return { message: 'success' };
    } catch (error) {
      new PrismaErrorHandler(error).handle();
    }
  }
}
