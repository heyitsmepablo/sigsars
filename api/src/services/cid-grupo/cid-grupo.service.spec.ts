import { Test, TestingModule } from '@nestjs/testing';
import { CidGrupoService } from './cid-grupo.service';
import { prismaMock } from 'src/__mock__/prisma-singleton';
import { Prisma } from 'generated/prisma';

describe('CidGrupoService', () => {
  let service: CidGrupoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CidGrupoService],
    }).compile();

    service = module.get<CidGrupoService>(CidGrupoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('findAll', () => {
    const prismaPayloadResponse: Prisma.cid_grupoGetPayload<true>[] = [
      {
        id: 1,
        descricao: 'test',
        codigo_categoria_fim: 't',
        codigo_categoria_inicio: 't',
        criado_em: null,
        atualizado_em: null,
      },
    ];
    it('Deve resolver com payload na resposta', async () => {
      prismaMock.cid_grupo.findMany.mockResolvedValue(prismaPayloadResponse);
      await expect(service.findAll()).resolves.toEqual(prismaPayloadResponse);
    });
    it('Deve rejeitar jogando erro no payload de resposta', async () => {
      const erroGenerico = new Error('generico');
      prismaMock.cid_grupo.findMany.mockRejectedValue(erroGenerico);
      await expect(service.findAll()).rejects.toThrow(erroGenerico);
    });
  });
});
