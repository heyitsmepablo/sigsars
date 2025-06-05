import { Test, TestingModule } from '@nestjs/testing';
import { CidGrupoController } from './cid-grupo.controller';
import { CidGrupoService } from 'src/services/cid-grupo/cid-grupo.service';
import { cidGrupoServiceMock } from 'src/__mock__/services/cid-grupo.service';
import { Prisma } from 'generated/prisma';

describe('CidGrupoController', () => {
  let controller: CidGrupoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CidGrupoController],
      providers: [{ provide: CidGrupoService, useValue: cidGrupoServiceMock }],
    }).compile();

    controller = module.get<CidGrupoController>(CidGrupoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('findAll', () => {
    const serviceResponsePayload: Prisma.cid_grupoGetPayload<true>[] = [
      {
        id: 1,
        codigo_categoria_fim: 'teste',
        codigo_categoria_inicio: 'teste',
        descricao: 'teste',
        atualizado_em: null,
        criado_em: null,
      },
    ];
    it('Deve resolver retornando com payload na resposta', async () => {
      const expectedResponse = serviceResponsePayload;
      cidGrupoServiceMock.findAll.mockResolvedValue(serviceResponsePayload);
      await expect(controller.findAll()).resolves.toEqual(
        expectedResponse as unknown as Prisma.cid_grupoGetPayload<true>,
      );
    });
    it('Deve rejeitar jogando com erro na resposta', async () => {
      const expectedResponse = new Error('Erro Genereico');
      cidGrupoServiceMock.findAll.mockRejectedValue(expectedResponse);
      await expect(controller.findAll()).rejects.toEqual(expectedResponse);
    });
  });
});
