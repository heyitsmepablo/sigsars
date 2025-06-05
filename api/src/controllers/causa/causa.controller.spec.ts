import { Test, TestingModule } from '@nestjs/testing';
import { CausaController } from './causa.controller';
import { CausaService } from 'src/services/causa/causa.service';
import { causaServiceMock } from 'src/__mock__/services/causa.service';
import { Prisma } from 'generated/prisma';

describe('CausaController', () => {
  let controller: CausaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CausaController],
      providers: [{ provide: CausaService, useValue: causaServiceMock }],
    }).compile();

    controller = module.get<CausaController>(CausaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('findAll', () => {
    const serviceResponsePayload: Prisma.causaGetPayload<true>[] = [
      {
        id: 1,
        nome: 'teste',
        tipo: 'EXTERNA',
        atualizado_em: null,
        criado_em: null,
      },
    ];
    it('Deve resolver retornando com payload na resposta', async () => {
      const expectedResponse = serviceResponsePayload;
      causaServiceMock.findAll.mockResolvedValue(serviceResponsePayload);
      await expect(controller.findAll()).resolves.toEqual(expectedResponse);
    });
    it('Deve rejeitar jogando com erro na resposta', async () => {
      const expectedResponse = new Error('Erro Genereico');
      causaServiceMock.findAll.mockRejectedValue(expectedResponse);
      await expect(controller.findAll()).rejects.toEqual(expectedResponse);
    });
  });
});
