import { Test, TestingModule } from '@nestjs/testing';
import { BoletimAtendimentoPortaService } from './boletim-atendimento-porta.service';
import { prismaMock } from 'src/__mock__/prisma-singleton';
import { Prisma } from 'generated/prisma';

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
    const requestPayload:
    const prismaBoletimAtendimentoPortaPayload: Prisma.boletim_atendimento_portaGetPayload<true> =
      {
        id: 1,
        unidade_id: 1,
        referente_ao_dia: new Date(),
        usuario_responsavel_preenchimento_id: 1,
        criado_em: null,
        atualizado_em: null,
      };
    it('deve resolver retornando payload', () => {
      const expectedServiceResponse = 'ok';
      prismaMock.boletim_atendimento_porta.create.mockResolvedValue({});
      expect(service.create()).toEqual(expectedServiceResponse);
    });
  });
});
