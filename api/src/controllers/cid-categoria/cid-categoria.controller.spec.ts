import { Test, TestingModule } from '@nestjs/testing';
import { CidCategoriaController } from './cid-categoria.controller';
import { Prisma } from 'generated/prisma';
import { cidCategoriaServiceMock } from 'src/__mock__/services/cid-categoria.service';
import { CidCategoriaService } from 'src/services/cid-categoria/cid-categoria.service';

describe('CidCategoriaController', () => {
  let controller: CidCategoriaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CidCategoriaController],
      providers: [
        { provide: CidCategoriaService, useValue: cidCategoriaServiceMock },
      ],
    }).compile();

    controller = module.get<CidCategoriaController>(CidCategoriaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    const serviceResponsePayload: Prisma.cid_categoriaGetPayload<true>[] = [
      {
        id: 1,
        cid_grupo_id: 1,
        codigo: 'teste',
        descricao: 'teste',
        atualizado_em: null,
        criado_em: null,
      },
    ];
    it('Deve resolver retornando com payload na resposta', async () => {
      const expectedResponse = serviceResponsePayload;
      cidCategoriaServiceMock.findAll.mockResolvedValue(serviceResponsePayload);
      await expect(controller.findAll()).resolves.toEqual(
        expectedResponse as unknown as Prisma.cid_categoriaGetPayload<true>,
      );
    });
    it('Deve rejeitar jogando com erro na resposta', async () => {
      const expectedResponse = new Error('Erro Genereico');
      cidCategoriaServiceMock.findAll.mockRejectedValue(expectedResponse);
      await expect(controller.findAll()).rejects.toEqual(expectedResponse);
    });
  });
});
