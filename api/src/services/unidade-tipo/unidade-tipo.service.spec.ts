import { Test, TestingModule } from '@nestjs/testing';
import { UnidadeTipoService } from './unidade-tipo.service';
import { Prisma } from 'generated/prisma';
import { prismaMock } from 'src/__mock__/prisma-singleton';

describe('UnidadeTipoService', () => {
  let service: UnidadeTipoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UnidadeTipoService],
    }).compile();

    service = module.get<UnidadeTipoService>(UnidadeTipoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    const prismaResponsePayload: Prisma.unidade_tipoGetPayload<true>[] = [
      { id: 1, nome: 'teste', criado_em: null, atualizado_em: null },
    ];
    it('Deve resolver retornando retornando o payload', async () => {
      const serviceExpectedResponse = prismaResponsePayload;
      prismaMock.unidade_tipo.findMany.mockResolvedValue(prismaResponsePayload);
      await expect(service.findAll()).resolves.toEqual(serviceExpectedResponse);
    });
    it('Deve rejeitar jogando o erro no payload', async () => {
      const erroGenerico = new Error('erro generico');
      prismaMock.unidade_tipo.findMany.mockRejectedValue(erroGenerico);
      await expect(service.findAll()).rejects.toThrow(erroGenerico);
    });
  });
});
