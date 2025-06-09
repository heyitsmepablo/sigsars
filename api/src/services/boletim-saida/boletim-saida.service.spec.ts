import { Test, TestingModule } from '@nestjs/testing';
import { BoletimSaidaService } from './boletim-saida.service';
import { BoletimSaidaServiceCreateArgs } from 'src/dtos/boletim-saida.dto';
import { Prisma } from 'generated/prisma';
import { prismaMock } from 'src/__mock__/prisma-singleton';

describe('BoletimSaidaService', () => {
  let service: BoletimSaidaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoletimSaidaService],
    }).compile();

    service = module.get<BoletimSaidaService>(BoletimSaidaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('create', () => {
    const requestPayload: BoletimSaidaServiceCreateArgs = {
      boletim: {
        referente_ao_dia: new Date(),
        unidade_id: 1,
        usuario_responsavel_preenchimento_id: 'uuid',
      },
      items: [
        {
          boletim_saida_id: 1,
          leito_de_destino: 'ENFERMARIA_CIRURGICA',
          local_de_saida: 'INTERNACAO',
          tipo_da_saida: 'ALTA',
          total_de_saida: 1,
          unidade_destino_id: 1,
        },
      ],
    };
    const prismaPayload: Prisma.boletim_saidaGetPayload<true> = {
      id: 1,
      unidade_id: 1,
      referente_ao_dia: new Date(),
      usuario_responsavel_preenchimento_id: 'uuid',
      criado_em: null,
      atualizado_em: null,
    };
    it('deve resolver retornando payload de sucesso', async () => {
      const expectedServiceResponse = { message: 'success' };
      prismaMock.boletim_saida.create.mockResolvedValue(prismaPayload);
      await expect(service.create(requestPayload)).resolves.toEqual(
        expectedServiceResponse,
      );
    });
    it('deve rejeitar jogando erro do servico no payload ', async () => {
      const expectedServiceResponse = new Error();
      prismaMock.boletim_saida.create.mockRejectedValue(new Error());
      await expect(service.create(requestPayload)).rejects.toEqual(
        expectedServiceResponse,
      );
    });
  });
});
