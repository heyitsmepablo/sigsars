import { Test, TestingModule } from '@nestjs/testing';
import { BoletimInternacaoOcupacaoService } from './boletim-internacao-ocupacao.service';
import { prismaMock } from 'src/__mock__/prisma-singleton';
import { Prisma } from 'generated/prisma';
import { BoletimInternacaoOcupacaoServiceCreateArgs } from 'src/dtos/boletim-internacao-ocupacao';

describe('BoletimInternacaoOcupacaoService', () => {
  let service: BoletimInternacaoOcupacaoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoletimInternacaoOcupacaoService],
    }).compile();

    service = module.get<BoletimInternacaoOcupacaoService>(
      BoletimInternacaoOcupacaoService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('create', () => {
    const requestPayload: BoletimInternacaoOcupacaoServiceCreateArgs = {
      unidade_id: 1,
      usuario_responsavel_preenchimento_id: 'uuid',
      referente_ao_dia: new Date(),
      pacientes_uti: 1,
      pacientes_uti_isolamento: 1,
      pacientes_enfermaria: 1,
      pacientes_enfermaria_isolamento: 1,
      pacientes_lsvp: 1,
      pacientes_estabilizacao_vermelha: 1,
    };
    const prismaBoletimOcupacaoAdmissaoPayload: Prisma.boletim_internacao_ocupacaoGetPayload<true> =
      {
        id: 1,
        unidade_id: 1,
        referente_ao_dia: new Date(),
        usuario_responsavel_preenchimento_id: 'uuid',
        pacientes_uti: 1,
        pacientes_uti_isolamento: 1,
        pacientes_enfermaria: 1,
        pacientes_enfermaria_isolamento: 1,
        pacientes_lsvp: 1,
        pacientes_estabilizacao_vermelha: 1,
        criado_em: null,
        atualizado_em: null,
      };
    it('deve resolver retornando payload de sucesso', async () => {
      const expectedServiceResponse = { message: 'success' };
      prismaMock.boletim_internacao_ocupacao.create.mockResolvedValue(
        prismaBoletimOcupacaoAdmissaoPayload,
      );
      await expect(service.create(requestPayload)).resolves.toEqual(
        expectedServiceResponse,
      );
    });
    it('deve rejeitar jogando erro do servico no payload ', async () => {
      const expectedServiceResponse = new Error();
      prismaMock.boletim_internacao_ocupacao.create.mockRejectedValue(
        new Error(),
      );
      await expect(service.create(requestPayload)).rejects.toEqual(
        expectedServiceResponse,
      );
    });
  });
});
