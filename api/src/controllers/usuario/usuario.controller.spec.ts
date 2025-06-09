import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from 'src/services/usuario/usuario.service';
import { usuarioServiceMock } from 'src/__mock__/services/usuario.service';
import { AuthGuard } from 'src/guards/auth/auth.guard';

describe('UsuarioController', () => {
  let controller: UsuarioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuarioController],
      providers: [{ provide: UsuarioService, useValue: usuarioServiceMock }],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true }) // mock do guard
      .compile();

    controller = module.get<UsuarioController>(UsuarioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('getById', () => {
    const IdArg = 'teste';
    it('Deve resolver retornando payload do servico usuario', async () => {
      const usuarioResponse = 'resposta';
      usuarioServiceMock.findOne.mockResolvedValue(usuarioResponse);
      await expect(controller.getById(IdArg)).resolves.toEqual(usuarioResponse);
    });
    it('Ao servico usuario falhar deve rejeitar jogando erro do servico', async () => {
      const erroGenerico = new Error('generico');
      usuarioServiceMock.findOne.mockRejectedValue(erroGenerico);
      await expect(controller.getById(IdArg)).rejects.toThrow(erroGenerico);
    });
  });
});
