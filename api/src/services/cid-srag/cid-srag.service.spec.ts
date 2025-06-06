import { Test, TestingModule } from '@nestjs/testing';
import { CidSragService } from './cid-srag.service';
import { prismaMock } from 'src/__mock__/prisma-singleton';
import { Prisma } from 'generated/prisma';

describe('CidSragService', () => {
  let service: CidSragService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CidSragService],
    }).compile();

    service = module.get<CidSragService>(CidSragService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('findAll', () => {
    const prismaPayloadResponse: Prisma.cid_sragGetPayload<{
      select: { id: true; cid: {}; criado_em: true; atualizado_em: true };
    }>[] = [
      {
        id: 1,
        cid: {
          id: 1,
          cid_categoria_id: 1,
          codigo: 'teste',
          patologia: 'teste',
          atualizado_em: null,
          criado_em: null,
        },
        criado_em: null,
        atualizado_em: null,
      },
    ];
    it('Deve resolver com payload na resposta', async () => {
      prismaMock.cid_srag.findMany.mockResolvedValue(
        prismaPayloadResponse as unknown as Prisma.cid_sragGetPayload<true>[],
      );
      await expect(service.findAll()).resolves.toEqual(prismaPayloadResponse);
    });
    it('Deve rejeitar jogando erro no payload de resposta', async () => {
      const erroGenerico = new Error('generico');
      prismaMock.cid_srag.findMany.mockRejectedValue(erroGenerico);
      await expect(service.findAll()).rejects.toThrow(erroGenerico);
    });
  });
});
