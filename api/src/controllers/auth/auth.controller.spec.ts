import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('signUp', () => {
    const IdArg = 'teste';
    it('Deve resolver retornando payload do servico usuario', async () => {
      const usuarioResponse = 'resposta';
      usuarioServiceMock.create.mockResolvedValue(usuarioResponse);
      await expect(controller.signUp()).resolves.toEqual(usuarioResponse);
    });
    it('Ao servico usuario falhar deve rejeitar jogando erro do servico', async () => {
      const erroGenerico = new Error('generico');
      usuarioServiceMock.create.mockRejectedValue(erroGenerico);
      await expect(controller.signUp()).rejects.toThrow(erroGenerico);
    });
  });
});
