import { Test, TestingModule } from '@nestjs/testing';
import { CidService } from './cid.service';
import { prismaMock } from 'src/__mock__/prisma-singleton';
import { Prisma } from 'generated/prisma';

describe('CidService', () => {
  let service: CidService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CidService],
    }).compile();

    service = module.get<CidService>(CidService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('findAll', () => {
    const prismaPayloadResponse: Prisma.cidGetPayload<true>[] = [
      {
        id: 1,
        patologia: 'teste',
        cid_categoria_id: 1,
        codigo: 'teste',
        criado_em: null,
        atualizado_em: null,
      },
    ];
    it('Deve resolver com payload na resposta', async () => {
      prismaMock.cid.findMany.mockResolvedValue(prismaPayloadResponse);
      await expect(service.findAll()).resolves.toEqual(prismaPayloadResponse);
    });
    it('Deve rejeitar jogando erro no payload de resposta', async () => {
      const erroGenerico = new Error('generico');
      prismaMock.cid.findMany.mockRejectedValue(erroGenerico);
      await expect(service.findAll()).rejects.toThrow(erroGenerico);
    });
  });
});
