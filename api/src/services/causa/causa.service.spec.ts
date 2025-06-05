import { Test, TestingModule } from '@nestjs/testing';
import { CausaService } from './causa.service';
import { Prisma } from 'generated/prisma';
import { prismaMock } from 'src/__mock__/prisma-singleton';

describe('CausaService', () => {
  let service: CausaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CausaService],
    }).compile();

    service = module.get<CausaService>(CausaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    const prismaPayloadResponse: Prisma.causaGetPayload<true>[] = [
      {
        id: 1,
        nome: 'teste',
        tipo: 'EXTERNA',
        criado_em: null,
        atualizado_em: null,
      },
    ];
    it('Deve resolver com payload na resposta', async () => {
      prismaMock.causa.findMany.mockResolvedValue(prismaPayloadResponse);
      await expect(service.findAll()).resolves.toEqual(prismaPayloadResponse);
    });
    it('Deve rejeitar jogando erro no payload de resposta', async () => {
      const erroGenerico = new Error('generico');
      prismaMock.causa.findMany.mockRejectedValue(erroGenerico);
      await expect(service.findAll()).rejects.toThrow(erroGenerico);
    });
  });
});
