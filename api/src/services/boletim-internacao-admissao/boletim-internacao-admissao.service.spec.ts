import { Test, TestingModule } from '@nestjs/testing';
import { BoletimInternacaoAdmissaoService } from './boletim-internacao-admissao.service';
import { Prisma } from 'generated/prisma';
import { prismaMock } from 'src/__mock__/prisma-singleton';
import { BoletimInternacaoAdmissaoServiceCreateArgs } from 'src/dtos/boletim-internacao-admissao.dto';

describe('BoletimInternacaoAdmissaoService', () => {
  let service: BoletimInternacaoAdmissaoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoletimInternacaoAdmissaoService],
    }).compile();

    service = module.get<BoletimInternacaoAdmissaoService>(
      BoletimInternacaoAdmissaoService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('create', () => {
    const requestPayload: BoletimInternacaoAdmissaoServiceCreateArgs = {
      referente_ao_dia: new Date(),
      unidade_id: 1,
      usuario_responsavel_preenchimento_id: 'uuid',
      items: [
        {
          boletim_internacao_admissao_id: 1,
          cid_id: 1,
          numero_de_admissoes: 1,
          genero: 'F',
          faixa_etaria: 'teste',
        },
      ],
    };
    const prismaBoletimAtendimentoPortaPayload: Prisma.boletim_internacao_admissaoGetPayload<true> =
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
      prismaMock.boletim_internacao_admissao.create.mockResolvedValue(
        prismaBoletimAtendimentoPortaPayload,
      );
      await expect(service.create(requestPayload)).resolves.toEqual(
        expectedServiceResponse,
      );
    });
    it('deve rejeitar jogando erro do servico no payload ', async () => {
      const expectedServiceResponse = new Error();
      prismaMock.boletim_internacao_admissao.create.mockRejectedValue(
        new Error(),
      );
      await expect(service.create(requestPayload)).rejects.toEqual(
        expectedServiceResponse,
      );
    });
  });
});
