import { Test, TestingModule } from '@nestjs/testing';
import { BoletimAtendimentoPortaService } from './boletim-atendimento-porta.service';
import { prismaMock } from 'src/__mock__/prisma-singleton';
import { Prisma } from 'generated/prisma';
import { BoletimAtendimentoPortaServiceCreateArgs } from 'src/dtos/boletim-atendimento-porta.dto';

describe('BoletimAtendimentoPortaService', () => {
  let service: BoletimAtendimentoPortaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoletimAtendimentoPortaService],
    }).compile();

    service = module.get<BoletimAtendimentoPortaService>(
      BoletimAtendimentoPortaService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('create', () => {
    const requestPayload: BoletimAtendimentoPortaServiceCreateArgs = {
      boletim: {
        referente_ao_dia: new Date(),
        unidade_id: 1,
        usuario_responsavel_preenchimento_id: 'uuid',
      },
      items: [
        {
          causa_id: 1,
          faixa_etaria: 'teste',
          boletim_atendimento_porta_id: 1,
          genero: 'F',
          numero_de_atendimentos: 123,
          origem: 'DEMANDA_ESPONTANEA_INTERIOR',
          turno: 'SERVICO_DIURNO',
        },
      ],
    };
    const prismaBoletimAtendimentoPortaPayload: Prisma.boletim_atendimento_portaGetPayload<true> =
      {
        id: 1,
        unidade_id: 1,
        referente_ao_dia: new Date(),
        usuario_responsavel_preenchimento_id: 'uuid',
        criado_em: null,
        atualizado_em: null,
      };
    it('deve resolver retornando payload de sucesso', async () => {
      const expectedServiceResponse = { message: 'success' };
      prismaMock.boletim_atendimento_porta.create.mockResolvedValue(
        prismaBoletimAtendimentoPortaPayload,
      );
      await expect(service.create(requestPayload)).resolves.toEqual(
        expectedServiceResponse,
      );
    });
    it('deve rejeitar jogando erro do servico no payload ', async () => {
      const expectedServiceResponse = new Error();
      prismaMock.boletim_atendimento_porta.create.mockRejectedValue(
        new Error(),
      );
      await expect(service.create(requestPayload)).rejects.toEqual(
        expectedServiceResponse,
      );
    });
  });
});
