import { Test, TestingModule } from '@nestjs/testing';
import { CidCategoriaService } from './cid-categoria.service';
import { Prisma } from 'generated/prisma';
import { prismaMock } from 'src/__mock__/prisma-singleton';

describe('CidCategoriaService', () => {
  let service: CidCategoriaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CidCategoriaService],
    }).compile();

    service = module.get<CidCategoriaService>(CidCategoriaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('findAll', () => {
    const prismaPayloadResponse: Prisma.cid_categoriaGetPayload<true>[] = [
      {
        id: 1,
        descricao: 'test',
        cid_grupo_id: 1,
        codigo: 'teste',
        criado_em: null,
        atualizado_em: null,
      },
    ];
    it('Deve resolver com payload na resposta', async () => {
      prismaMock.cid_categoria.findMany.mockResolvedValue(
        prismaPayloadResponse,
      );
      await expect(service.findAll()).resolves.toEqual(prismaPayloadResponse);
    });
    it('Deve rejeitar jogando erro no payload de resposta', async () => {
      const erroGenerico = new Error('generico');
      prismaMock.cid_categoria.findMany.mockRejectedValue(erroGenerico);
      await expect(service.findAll()).rejects.toThrow(erroGenerico);
    });
  });
});
