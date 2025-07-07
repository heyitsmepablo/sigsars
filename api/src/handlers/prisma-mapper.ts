import { Prisma } from 'generated/prisma';
import { FichaSpaCreateDto } from 'src/dtos/ficha-spa.dto';

export class PrismaMapper {
  static createFichaSpa(dto: FichaSpaCreateDto): Prisma.ficha_spaCreateInput {
    return {
      data_da_ficha: dto.data_da_ficha,

      unidade: { connect: { id: dto.unidade_id } },

      usuario: { connect: { id: dto.usuario_responsavel_preenchimento_id } },

      ficha_spa_recepcao: {
        create: dto.recepcao,
      },

      ficha_spa_classificacao: {
        create: {
          hora_da_classificacao: dto.classificacao.hora_da_classificacao,
          manchester: dto.classificacao.manchester,
          retornou_com_menos_ou_igual_48h:
            dto.classificacao.retornou_com_menos_ou_igual_48h,

          causa: dto.classificacao.causa_externa_id
            ? { connect: { id: dto.classificacao.causa_externa_id } }
            : undefined,

          ficha_spa_doenca_preexistente: {
            create: { ...dto.classificacao.doenca_prexistente },
          },

          ficha_spa_protocolo_e_condicao_especial: {
            create: { ...dto.classificacao.protocolo_e_condicao_especial },
          },

          ficha_spa_encaminhamento: {
            create: { ...dto.classificacao.encaminhamento },
          },

          ficha_spa_queixa: dto.classificacao.queixa
            ? {
                createMany: { data: dto.classificacao.queixa },
              }
            : undefined,
        },
      },

      ficha_spa_atendimento_medico: {
        create: {
          horario_do_atendimento_medico:
            dto.atendimento_medico.horario_do_atendimento_medico,

          ficha_spa_exame_solicitado: {
            create: { ...dto.atendimento_medico.exame_solicitado },
          },
        },
      },

      ficha_spa_plano_terapeutico: {
        create: dto.plano_terapeutico,
      },

      ficha_spa_destino_final_do_paciente: {
        create: {
          destino_final: dto.destino_final_do_paciente.destino_final,
          horario_da_saida: dto.destino_final_do_paciente.horario_da_saida,
          horario_da_saida_para_o_setor_de_internacao:
            dto.destino_final_do_paciente
              .horario_da_saida_para_o_sertor_de_internacao,

          unidade: dto.destino_final_do_paciente.unidade_transferida_id
            ? {
                connect: {
                  id: dto.destino_final_do_paciente.unidade_transferida_id,
                },
              }
            : undefined,
        },
      },
    };
  }
}
