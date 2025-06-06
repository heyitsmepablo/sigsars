import { Test, TestingModule } from '@nestjs/testing';
import { CidSragController } from './cid-srag.controller';
import { CidSragService } from 'src/services/cid-srag/cid-srag.service';
import { cidSragServiceMock } from 'src/__mock__/services/cid-srag.service';
import { Prisma } from 'generated/prisma';

describe('CidSragController', () => {
  let controller: CidSragController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CidSragController],
      providers: [{ provide: CidSragService, useValue: cidSragServiceMock }],
    }).compile();

    controller = module.get<CidSragController>(CidSragController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    const serviceResponsePayload: Prisma.cid_sragGetPayload<{
      select: { id: true; cid: {}; criado_em: true; atualizado_em: true };
    }>[] = [
      {
        id: 1,
        cid: {
          id: 1,
          cid_categoria_id: 1,
          codigo: 'teste',
          patologia: 'teste',
          criado_em: null,
          atualizado_em: null,
        },
        atualizado_em: null,
        criado_em: null,
      },
    ];
    it('Deve resolver retornando com payload na resposta', async () => {
      const expectedResponse = serviceResponsePayload;
      cidSragServiceMock.findAll.mockResolvedValue(serviceResponsePayload);
      await expect(controller.findAll()).resolves.toEqual(
        expectedResponse as unknown as Prisma.cid_sragGetPayload<true>,
      );
    });
    it('Deve rejeitar jogando com erro na resposta', async () => {
      const expectedResponse = new Error('Erro Genereico');
      cidSragServiceMock.findAll.mockRejectedValue(expectedResponse);
      await expect(controller.findAll()).rejects.toEqual(expectedResponse);
    });
  });
});
