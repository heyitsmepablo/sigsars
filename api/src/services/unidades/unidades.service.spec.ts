import { Test, TestingModule } from '@nestjs/testing';
import { UnidadesService } from './unidades.service';
import { Prisma } from 'generated/prisma';
import { prismaMock } from 'src/__mock__/prisma-singleton';

describe('UnidadesService', () => {
  let service: UnidadesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UnidadesService],
    }).compile();

    service = module.get<UnidadesService>(UnidadesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    const prismaResponsePayload: Prisma.unidadeGetPayload<{
      select: {
        id: true;
        nome: true;
        tipo_unidade_id: true;
        criado_em: true;
        atualizado_em: true;
      };
    }>[] = [
      {
        id: 1,
        nome: 'texto',
        tipo_unidade_id: 1,
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
    //   it('Deve rejeitar jogando o erro no payload', async () => {});
  });
});
