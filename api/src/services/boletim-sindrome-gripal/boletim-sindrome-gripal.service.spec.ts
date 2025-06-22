import { Test, TestingModule } from '@nestjs/testing';
import { BoletimSindromeGripalService } from './boletim-sindrome-gripal.service';
import { Prisma } from 'generated/prisma';
import { prismaMock } from 'src/__mock__/prisma-singleton';
import { BoletimSindromeGripalServiceCreateArgs } from 'src/dtos/boletim-sindrome-gripal.dto';

describe('BoletimSindromeGripalService', () => {
  let service: BoletimSindromeGripalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoletimSindromeGripalService],
    }).compile();

    service = module.get<BoletimSindromeGripalService>(
      BoletimSindromeGripalService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('create', () => {
    const requestPayload: BoletimSindromeGripalServiceCreateArgs =
      new BoletimSindromeGripalServiceCreateArgs();
    const prismaBoletimAtendimentoPortaPayload: Prisma.boletim_sindrome_gripalGetPayload<true> =
      {
        id: 1,
        total_atendimentos_sd_com_queixa_gripal: 1,
        total_atendimentos_sd_sem_queixa_gripal: 1,
        total_atendimentos_sn_com_queixa_gripal: 1,
        total_atendimentos_sn_sem_queixa_gripal: 1,
        total_internacoes_apos_atendimento_urgencia_com_queixa_gripal: 1,
        total_internacoes_apos_atendimento_urgencia_sem_queixa_gripal: 1,
        total_obitos: 1,
        total_transferencias: 1,
        referente_ao_dia: new Date(),
        unidade_id: 1,
        usuario_responsavel_preenchimento_id: 'uuid',
        criado_em: null,
        atualizado_em: null,
      };
    it('deve resolver retornando payload de sucesso', async () => {
      const expectedServiceResponse = { message: 'success' };
      prismaMock.boletim_sindrome_gripal.create.mockResolvedValue(
        prismaBoletimAtendimentoPortaPayload,
      );
      await expect(service.create(requestPayload)).resolves.toEqual(
        expectedServiceResponse,
      );
    });
    it('deve rejeitar jogando erro do servico no payload ', async () => {
      const expectedServiceResponse = new Error();
      prismaMock.boletim_sindrome_gripal.create.mockRejectedValue(new Error());
      await expect(service.create(requestPayload)).rejects.toEqual(
        expectedServiceResponse,
      );
    });
  });
  describe('findAll', () => {
    const prismaBoletimAtendimentoPortaPayload: Prisma.boletim_sindrome_gripalGetPayload<true>[] =
      [
        {
          id: 1,
          total_atendimentos_sd_com_queixa_gripal: 1,
          total_atendimentos_sd_sem_queixa_gripal: 1,
          total_atendimentos_sn_com_queixa_gripal: 1,
          total_atendimentos_sn_sem_queixa_gripal: 1,
          total_internacoes_apos_atendimento_urgencia_com_queixa_gripal: 1,
          total_internacoes_apos_atendimento_urgencia_sem_queixa_gripal: 1,
          total_obitos: 1,
          total_transferencias: 1,
          referente_ao_dia: new Date(),
          unidade_id: 1,
          usuario_responsavel_preenchimento_id: 'uuid',
          criado_em: null,
          atualizado_em: null,
        },
      ];
    it('deve resolver retornando payload do prisma', async () => {
      const expectedServiceResponse = prismaBoletimAtendimentoPortaPayload;
      prismaMock.boletim_sindrome_gripal.findMany.mockResolvedValue(
        prismaBoletimAtendimentoPortaPayload,
      );
      await expect(service.findAll()).resolves.toEqual(expectedServiceResponse);
    });
    it('deve rejeitar jogando erro do servico no payload ', async () => {
      const expectedServiceResponse = new Error();
      prismaMock.boletim_sindrome_gripal.findMany.mockRejectedValue(
        new Error(),
      );
      await expect(service.findAll()).rejects.toEqual(expectedServiceResponse);
    });
  });
  describe('findOne', () => {
    const requestPayload = { where: { id: 1 } };
    const prismaBoletimAtendimentoPortaPayload: Prisma.boletim_sindrome_gripalGetPayload<true> =
      {
        id: 1,
        total_atendimentos_sd_com_queixa_gripal: 1,
        total_atendimentos_sd_sem_queixa_gripal: 1,
        total_atendimentos_sn_com_queixa_gripal: 1,
        total_atendimentos_sn_sem_queixa_gripal: 1,
        total_internacoes_apos_atendimento_urgencia_com_queixa_gripal: 1,
        total_internacoes_apos_atendimento_urgencia_sem_queixa_gripal: 1,
        total_obitos: 1,
        total_transferencias: 1,
        referente_ao_dia: new Date(),
        unidade_id: 1,
        usuario_responsavel_preenchimento_id: 'uuid',
        criado_em: null,
        atualizado_em: null,
      };
    it('deve resolver retornando payload do prisma', async () => {
      const expectedServiceResponse = prismaBoletimAtendimentoPortaPayload;
      prismaMock.boletim_sindrome_gripal.findUnique.mockResolvedValue(
        prismaBoletimAtendimentoPortaPayload,
      );
      await expect(service.findOne(requestPayload)).resolves.toEqual(
        expectedServiceResponse,
      );
    });
    it('deve rejeitar jogando erro do servico no payload ', async () => {
      const expectedServiceResponse = new Error();
      prismaMock.boletim_sindrome_gripal.findUnique.mockRejectedValue(
        new Error(),
      );
      await expect(service.findOne(requestPayload)).rejects.toEqual(
        expectedServiceResponse,
      );
    });
  });
});
