import { Test, TestingModule } from '@nestjs/testing';
import { CausaSgService } from './causa-sg.service';
import { Prisma } from 'generated/prisma';
import { prismaMock } from 'src/__mock__/prisma-singleton';

describe('CausaSgService', () => {
  let service: CausaSgService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CausaSgService],
    }).compile();

    service = module.get<CausaSgService>(CausaSgService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    const prismaPayloadResponse: Prisma.causa_sgGetPayload<{
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
      prismaMock.causa_sg.findMany.mockResolvedValue(
        prismaPayloadResponse as unknown as Prisma.causa_sgGetPayload<true>[],
      );

      await expect(service.findAll()).resolves.toEqual(prismaPayloadResponse);
    });
    it('Deve rejeitar jogando erro no payload de resposta', async () => {
      const erroGenerico = new Error('generico');
      prismaMock.causa_sg.findMany.mockRejectedValue(erroGenerico);
      await expect(service.findAll()).rejects.toThrow(erroGenerico);
    });
  });
});
