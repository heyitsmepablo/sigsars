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

  async findAll(options: { where?: { unidade_id?: number } }) {
    try {
      return await this.#db.ficha_spa.findMany({
        where: options.where,
        select: {
          id: true,
          numero_da_ficha: true,
          data_da_ficha: true,
          unidade: {
            select: { id: true, nome: true, sigla: true },
          },
          usuario: { select: { id: true, nome: true } },
          criado_em: true,
          atualizado_em: true,
        },
      });
    } catch (error) {
      new PrismaErrorHandler(error).handle();
    }
  }
  async findOne(options: { where?: { unidade_id?: number; id: number } }) {
    if (!options.where?.id) {
      throw Error('O campo id é obrigatorio');
    }

    try {
      return await this.#db.ficha_spa.findUnique({
        where: options.where,
        select: {
          id: true,
          numero_da_ficha: true,
          usuario: { select: { nome: true } },
          data_da_ficha: true,
          unidade: { select: { id: true, nome: true, sigla: true } },
          ficha_spa_recepcao: {
            select: {
              nome_paciente: true,
              raca_cor: true,
              procedencia: true,
              nao_identificado: true,
              hora_da_recepcao: true,
              genero: true,
              data_de_nascimento: true,
              cartao_sus_ou_cpf: true,
              criado_em: true,
              atualizado_em: true,
              municipio_procedencia_interior: {
                select: {
                  id: true,
                  nome: true,
                  estado: { select: { id: true, nome: true, uf: true } },
                },
              },
              municipio_rg: {
                select: {
                  id: true,
                  nome: true,
                  estado: { select: { id: true, nome: true, uf: true } },
                },
              },
            },
          },
          ficha_spa_classificacao: {
            select: {
              hora_da_classificacao: true,
              causa: true,
              retornou_com_menos_ou_igual_48h: true,
              ficha_spa_doenca_preexistente: true,
              ficha_spa_encaminhamento: true,
              ficha_spa_protocolo_e_condicao_especial: true,
              manchester: true,
            },
          },
          ficha_spa_atendimento_medico: true,
          ficha_spa_plano_terapeutico: true,
          ficha_spa_destino_final_do_paciente: true,
          criado_em: true,
          atualizado_em: true,
        },
      });
    } catch (error) {
      new PrismaErrorHandler(error).handle();
    }
  }
}
