import { Test, TestingModule } from '@nestjs/testing';
import { CausaSragController } from './causa_srag.controller';
import { Prisma } from 'generated/prisma';
import { causaSragServiceMock } from 'src/__mock__/services/causa-srag.service';
import { CausaSragService } from 'src/services/causa-srag/causa-srag.service';
import { AuthGuard } from 'src/guards/auth/auth.guard';

describe('CausaSragController', () => {
  let controller: CausaSragController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CausaSragController],
      providers: [
        { provide: CausaSragService, useValue: causaSragServiceMock },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true }) // mock do guard
      .compile();

    controller = module.get<CausaSragController>(CausaSragController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('findAll', () => {
    const serviceResponsePayload: Prisma.causa_sragGetPayload<{
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
      causaSragServiceMock.findAll.mockResolvedValue(serviceResponsePayload);
      await expect(controller.findAll()).resolves.toEqual(
        expectedResponse as unknown as Prisma.causa_sragGetPayload<true>,
      );
    });
    it('Deve rejeitar jogando com erro na resposta', async () => {
      const expectedResponse = new Error('Erro Genereico');
      causaSragServiceMock.findAll.mockRejectedValue(expectedResponse);
      await expect(controller.findAll()).rejects.toEqual(expectedResponse);
    });
  });
});
