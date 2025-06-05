import { Test, TestingModule } from '@nestjs/testing';
import { UnidadeService } from './unidade.service';
import { Prisma } from 'generated/prisma';
import { prismaMock } from 'src/__mock__/prisma-singleton';

describe('UnidadesService', () => {
  let service: UnidadeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UnidadesService],
    }).compile();

    service = module.get<UnidadeService>(UnidadeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    const prismaResponsePayload: Prisma.unidadeGetPayload<{
      select: {
        id: true;
        nome: true;
        unidade_tipo_id: true;
        criado_em: true;
        atualizado_em: true;
      };
    }>[] = [
      {
        id: 1,
        nome: 'texto',
        unidade_tipo_id: 1,
        criado_em: null,
        atualizado_em: null,
      },
    ];
    const serviceExpectedResponse = prismaResponsePayload;

    it('Deve resolver retornando retornando o payload', async () => {
      prismaMock.unidade.findMany.mockResolvedValue(
        prismaResponsePayload as Prisma.unidadeGetPayload<true>[],
      );
      await expect(service.findAll()).resolves.toEqual(serviceExpectedResponse);
    });
    it('Deve rejeitar jogando o erro no payload', async () => {
      const erroGenerico = new Error('erro generico');
      prismaMock.unidade.findMany.mockRejectedValue(erroGenerico);
      await expect(service.findAll()).rejects.toThrow(erroGenerico);
    });
  });
});
