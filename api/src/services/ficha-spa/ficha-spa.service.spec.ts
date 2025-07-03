import { Test, TestingModule } from '@nestjs/testing';
import { FichaSpaService } from './ficha-spa.service';
import { prismaMock } from 'src/__mock__/prisma-singleton';
import { Prisma } from 'generated/prisma';
import { FichaSpaCreateInput } from 'src/dtos/ficha-spa.dto';

describe('FichaSpaService', () => {
  let service: FichaSpaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FichaSpaService],
    }).compile();

    service = module.get<FichaSpaService>(FichaSpaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const prismaResponse = 'mensagem do servico';

    const createRequest: FichaSpaCreateInput = {
      usuario_responsavel_preenchimento_id: 'user-123',
      unidade_id: 1,
      data_da_ficha: new Date(),

      ficha_spa_recepcao: {
        hora_da_recepcao: '08:30',
        nao_identificado: false,
        nome_paciente: 'João da Silva',
        genero: 'M',
        data_de_nascimento: new Date('1990-05-15'),
        cartao_sus_ou_cpf: '12345678900',
        municipio_rg_id: 101,
        raca_cor: 'AMARELA',
        procedencia: 'DEMANDA_ESPONTANEA_INTERIOR',
        municipio_procedencia_interior_id: null,
      },

      ficha_spa_classificacao: {
        hora_da_classificacao: '09:00',
        cauxar_externa_id: null,
        retornou_com_menos_ou_igual_48h: false,
        ficha_spa_doenca_prexistente: {
          has: true,
          dm: true,
          drc: false,
          outros: 'Hipertensão',
        },
        ficha_spa_protocolo_e_condicao_especial: {
          sepse: false,
          dor_toracica: true,
          avc: false,
          notificacao: true,
          notificacao_agravo_id: 99,
        },
        ficha_spa_encaminhamento: {
          encaminhado_para_1: 'CLINICO',
          encaminhado_para_2: 'CLINICO',
          hora_da_realizacao_ecg: '09:10',
        },
        manchester: 'AMARELO',
        ficha_spa_queixa: [{ causa_id: 1 }, { causa_id: 2 }],
      },

      ficha_spa_atendimento_medico: {
        horario_do_atendimento_medico: '09:30',
        ficha_spa_exame_solicitado: {
          raio_x: true,
          tomografia: false,
          ecg: true,
          ultrassonografia: false,
          laboratorio: true,
        },
      },

      ficha_spa_plano_terapeutico: {
        horario_do_atendimento_na_medicacao_observacao: '10:00',
      },

      ficha_spa_destino_final_do_paciente: {
        horario_da_saida: '10:45',
        destino_final: 'ALTA',
        unidade_transferida_id: 1,
        horario_da_saida_para_o_sertor_de_Internacao: '10:50',
      },
    };

    const successResponse = { message: 'success' };
    it('Deve resolver com a resposta de sucesso no payload', async () => {
      prismaMock.ficha_spa.create.mockResolvedValue(
        prismaResponse as unknown as Prisma.ficha_spaGetPayload<true>,
      );
      await expect(service.create(createRequest)).resolves.toEqual(
        successResponse,
      );
    });
  });
});
