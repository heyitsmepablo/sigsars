import { Test, TestingModule } from '@nestjs/testing';
import { UnidadeTipoController } from './unidade-tipo.controller';
import { unidadeTipoServiceMock } from 'src/__mock__/services/unidade-tipo.service';
import { Prisma } from 'generated/prisma';
import { UnidadeTipoService } from 'src/services/unidade-tipo/unidade-tipo.service';
import { AuthGuard } from 'src/guards/auth/auth.guard';

describe('UnidadeTipoController', () => {
  let controller: UnidadeTipoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UnidadeTipoController],
      providers: [
        {
          provide: UnidadeTipoService,
          useValue: unidadeTipoServiceMock,
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true }) // mock do guard
      .compile();

    controller = module.get<UnidadeTipoController>(UnidadeTipoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('findAll', () => {
    const prismaPayloadResponse: Prisma.unidade_tipoGetPayload<true>[] = [
      { id: 1, nome: 'teste', criado_em: null, atualizado_em: null },
    ];
    it('Deve resolver retornando com payload na resposta', async () => {
      const expectedResponse = prismaPayloadResponse;

      unidadeTipoServiceMock.findAll.mockResolvedValue(prismaPayloadResponse);
      await expect(controller.findAll()).resolves.toEqual(expectedResponse);
    });
    it('Deve rejeitar jogando com erro na resposta', async () => {
      const expectedResponse = new Error('Erro Genereico');

      unidadeTipoServiceMock.findAll.mockRejectedValue(expectedResponse);
      await expect(controller.findAll()).rejects.toEqual(expectedResponse);
    });
  });
});
