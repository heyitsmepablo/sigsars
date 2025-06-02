import { Test, TestingModule } from '@nestjs/testing';
import { UnidadeController } from './unidade.controller';

describe('UnidadeController', () => {
  let controller: UnidadeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UnidadeController],
    }).compile();

    controller = module.get<UnidadeController>(UnidadeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('Deve resolver retornando com payload na resposta', () => {
      const expectedResponse = { message: 'success' };

      expect(controller.findAll()).toEqual(expectedResponse);
    });

    // it('Deve rejeitar jogando com erro na resposta', async () => {
    //   const expectedResponse = new Error('Erro Genereico');
    //   await expect(controller.findAll()).rejects.toEqual(expectedResponse);
    // });
  });
});
