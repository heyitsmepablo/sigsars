import { Injectable } from '@nestjs/common';
import { FichaSpaCreateInput } from 'src/dtos/ficha-spa.dto';
import { PrismaErrorHandler } from 'src/handlers/prisma-error-handler';
import PrismaSingleton from 'src/singletons/prisma-singleton/prisma-singleton';

@Injectable()
export class FichaSpaService {
  #db = PrismaSingleton.instance.client;

  async create(data: FichaSpaCreateInput) {
    const {
      ficha_spa_recepcao,
      ficha_spa_plano_terapeutico,
      ficha_spa_destino_final_do_paciente,
      ficha_spa_classificacao,
      ficha_spa_atendimento_medico,
      ...ficha_spa
    } = data;

    const {
      ficha_spa_encaminhamento,
      ficha_spa_queixa,
      ficha_spa_doenca_prexistente,
      ficha_spa_protocolo_e_condicao_especial,
      ...classificacao
    } = ficha_spa_classificacao;

    const { ficha_spa_exame_solicitado, ...atendimento_medico } =
      ficha_spa_atendimento_medico;
    try {
      await this.#db.ficha_spa.create({
        data: {
          ...ficha_spa,
          ficha_spa_recepcao: { create: ficha_spa_recepcao },
          ficha_spa_classificacao: {
            create: {
              ...classificacao,
              ficha_spa_doenca_preexistente: {
                create: ficha_spa_doenca_prexistente,
              },
              ficha_spa_encaminhamento: {
                create: ficha_spa_encaminhamento,
              },
              ficha_spa_protocolo_e_condicao_especial: {
                create: ficha_spa_protocolo_e_condicao_especial,
              },
              ficha_spa_queixa: { create: ficha_spa_queixa },
            },
          },
          ficha_spa_atendimento_medico: {
            create: {
              ...atendimento_medico,
              ficha_spa_exame_solicitado: {
                create: ficha_spa_exame_solicitado,
              },
            },
          },
        },
      });
      return { message: 'success' };
    } catch (error) {
      new PrismaErrorHandler(error).handle();
    }
  }
}
