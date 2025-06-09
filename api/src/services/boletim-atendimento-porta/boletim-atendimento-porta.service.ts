import { Injectable } from '@nestjs/common';
import { BoletimAtendimentoPortaServiceCreateArgs } from 'src/dtos/boletim-atendimento-porta.dto';
import { PrismaErrorHandler } from 'src/handlers/prisma-error-handler';
import PrismaSingleton from 'src/singletons/prisma-singleton/prisma-singleton';

@Injectable()
export class BoletimAtendimentoPortaService {
  #database = PrismaSingleton.instance.client;
  async create(data: BoletimAtendimentoPortaServiceCreateArgs) {
    const { items, ...boletim } = data;
    try {
      await this.#database.boletim_atendimento_porta.create({
        data: { ...boletim, boletim_atendimento_porta_item: { create: items } },
      });
      return { message: 'success' };
    } catch (error) {
      new PrismaErrorHandler(error).handle();
    }
  }
}
