import { Test, TestingModule } from '@nestjs/testing';
import { UnidadeController } from './unidade.controller';
import { Prisma } from 'generated/prisma';
import { UnidadesService } from 'src/services/unidades/unidades.service';
import { unidadeServiceMock } from 'src/__mock__/services/unidade.service';

describe('UnidadeController', () => {
  let controller: UnidadeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UnidadeController],
      providers: [{ useValue: unidadeServiceMock, provide: UnidadesService }],
    }).compile();

    controller = module.get<UnidadeController>(UnidadeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    const prismaPayloadResponse: Prisma.unidadeGetPayload<{
      select: {
        id: true;
        nome: true;
        unidade_tipo_id: true;
        criado_em: true;
        atualizado_em: true;
      };
    }>[] = [
      {
        id: 1,
        atualizado_em: null,
        criado_em: null,
        nome: 'teste',
        unidade_tipo_id: 1,
      },
    ];
    it('Deve resolver retornando com payload na resposta', async () => {
      const expectedResponse = prismaPayloadResponse;
      const requestPayload = {};
      unidadeServiceMock.findAll.mockResolvedValue(prismaPayloadResponse);
      await expect(controller.findAll(requestPayload)).resolves.toEqual(
        expectedResponse,
      );
    });
    it('Deve rejeitar jogando com erro na resposta', async () => {
      const expectedResponse = new Error('Erro Genereico');
      const requestPayload = {};
      unidadeServiceMock.findAll.mockRejectedValue(expectedResponse);
      await expect(controller.findAll(requestPayload)).rejects.toEqual(
        expectedResponse,
      );
    });
  });
});
