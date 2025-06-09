import { Test, TestingModule } from '@nestjs/testing';
import { CidController } from './cid.controller';
import { Prisma } from 'generated/prisma';
import { CidService } from 'src/services/cid/cid.service';
import { cidServiceMock } from 'src/__mock__/services/cid.service';
import { AuthGuard } from 'src/guards/auth/auth.guard';

describe('CidController', () => {
  let controller: CidController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CidController],
      providers: [{ provide: CidService, useValue: cidServiceMock }],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true }) // mock do guard
      .compile();

    controller = module.get<CidController>(CidController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('findAll', () => {
    const serviceResponsePayload: Prisma.cidGetPayload<true>[] = [
      {
        id: 1,
        cid_categoria_id: 1,
        codigo: 'teste',
        patologia: 'teste',
        atualizado_em: null,
        criado_em: null,
      },
    ];
    it('Deve resolver retornando com payload na resposta', async () => {
      const expectedResponse = serviceResponsePayload;
      cidServiceMock.findAll.mockResolvedValue(serviceResponsePayload);
      await expect(controller.findAll()).resolves.toEqual(
        expectedResponse as unknown as Prisma.cidGetPayload<true>,
      );
    });
    it('Deve rejeitar jogando com erro na resposta', async () => {
      const expectedResponse = new Error('Erro Genereico');
      cidServiceMock.findAll.mockRejectedValue(expectedResponse);
      await expect(controller.findAll()).rejects.toEqual(expectedResponse);
    });
  });
});
