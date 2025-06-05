import { Test, TestingModule } from '@nestjs/testing';
import { CausaSragService } from './causa-srag.service';
import { Prisma } from 'generated/prisma';
import { prismaMock } from 'src/__mock__/prisma-singleton';

describe('CausaSragService', () => {
  let service: CausaSragService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CausaSragService],
    }).compile();

    service = module.get<CausaSragService>(CausaSragService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    const prismaPayloadResponse: Prisma.causa_sragGetPayload<{
      select: { id: true; causa: {}; criado_em: true; atualizado_em: true };
    }>[] = [
      {
        id: 1,
        causa: {
          id: 1,
          nome: 'test',
          tipo: 'EXTERNA',
          criado_em: null,
          atualizado_em: null,
        },
        criado_em: null,
        atualizado_em: null,
      },
    ];

    it('Deve resolver com payload na resposta', async () => {
      prismaMock.causa_srag.findMany.mockResolvedValue(
        prismaPayloadResponse as unknown as Prisma.causa_sragGetPayload<true>[],
      );

      await expect(service.findAll()).resolves.toEqual(prismaPayloadResponse);
    });
    it('Deve rejeitar jogando erro no payload de resposta', async () => {
      const erroGenerico = new Error('generico');
      prismaMock.causa_srag.findMany.mockRejectedValue(erroGenerico);
      await expect(service.findAll()).rejects.toThrow(erroGenerico);
    });
  });
});
