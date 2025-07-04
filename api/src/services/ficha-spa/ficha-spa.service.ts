import { Injectable } from '@nestjs/common';
import { FichaSpaCreateDto } from 'src/dtos/ficha-spa.dto';
import { PrismaErrorHandler } from 'src/handlers/prisma-error-handler';
import PrismaSingleton from 'src/singletons/prisma-singleton/prisma-singleton';

@Injectable()
export class FichaSpaService {
  #db = PrismaSingleton.instance.client;

  async create(data: FichaSpaCreateDto) {
    const {
      recepcao,
      plano_terapeutico,
      destino_final_do_paciente,
      classificacao,
      atendimento_medico,
      ...restFichaSpa
    } = data;

    const {
      encaminhamento,
      queixa,
      doenca_prexistente,
      protocolo_e_condicao_especial,
      ...restClassificacao
    } = classificacao;

    const { exame_solicitado, ...restAtendimentoMedico } = atendimento_medico;
    try {
      await this.#db.ficha_spa.create({
        data: {
          ...restFichaSpa,
          ficha_spa_recepcao: { create: recepcao },
          ficha_spa_classificacao: {
            create: {
              ...restClassificacao,
              ficha_spa_doenca_preexistente: {
                create: doenca_prexistente,
              },
              ficha_spa_encaminhamento: {
                create: encaminhamento,
              },
              ficha_spa_protocolo_e_condicao_especial: {
                create: protocolo_e_condicao_especial,
              },
              ficha_spa_queixa: { create: queixa },
            },
          },
          ficha_spa_atendimento_medico: {
            create: {
              ...restAtendimentoMedico,
              ficha_spa_exame_solicitado: {
                create: exame_solicitado,
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
