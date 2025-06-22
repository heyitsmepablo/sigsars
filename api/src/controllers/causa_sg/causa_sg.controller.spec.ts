import { Test, TestingModule } from '@nestjs/testing';
import { CausaSgController } from './causa_sg.controller';
import { Prisma } from 'generated/prisma';
import { causaSgServiceMock } from 'src/__mock__/services/causa-sg.service';
import { CausaSgService } from 'src/services/causa-sg/causa-sg.service';
import { AuthGuard } from 'src/guards/auth/auth.guard';

describe('CausaSgController', () => {
  let controller: CausaSgController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CausaSgController],
      providers: [{ provide: CausaSgService, useValue: causaSgServiceMock }],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true }) // mock do guard
      .compile();

    controller = module.get<CausaSgController>(CausaSgController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('findAll', () => {
    const serviceResponsePayload: Prisma.causa_sgGetPayload<{
      select: { id: true; causa: {}; criado_em: true; atualizado_em: true };
    }>[] = [
      {
        id: 1,
        causa: {
          id: 1,
          nome: 'TEST',
          tipo: 'EXTERNA',
          criado_em: null,
          atualizado_em: null,
        },
        atualizado_em: null,
        criado_em: null,
      },
    ];
    it('Deve resolver retornando com payload na resposta', async () => {
      const expectedResponse = serviceResponsePayload;
      causaSgServiceMock.findAll.mockResolvedValue(serviceResponsePayload);
      await expect(controller.findAll()).resolves.toEqual(
        expectedResponse as unknown as Prisma.causa_sgGetPayload<true>,
      );
    });
    it('Deve rejeitar jogando com erro na resposta', async () => {
      const expectedResponse = new Error('Erro Genereico');
      causaSgServiceMock.findAll.mockRejectedValue(expectedResponse);
      await expect(controller.findAll()).rejects.toEqual(expectedResponse);
    });
  });
});
