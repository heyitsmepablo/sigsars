import { Injectable } from '@nestjs/common';
import { FichaSpaCreateDto } from 'src/dtos/ficha-spa.dto';
import { PrismaErrorHandler } from 'src/handlers/prisma-error-handler';
import { PrismaMapper } from 'src/handlers/prisma-mapper';
import PrismaSingleton from 'src/singletons/prisma-singleton/prisma-singleton';

@Injectable()
export class FichaSpaService {
  #db = PrismaSingleton.instance.client;

  async create(data: FichaSpaCreateDto) {
    const dataMapped = PrismaMapper.createFichaSpa(data);
    try {
      await this.#db.ficha_spa.create({
        data: dataMapped,
      });
      return { message: 'success' };
    } catch (error) {
      new PrismaErrorHandler(error).handle();
    }
  }
}
