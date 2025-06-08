import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from 'src/services/auth/auth.service';
import { authServiceMock } from 'src/__mock__/services/auth.service';
import { AuthLoginDto, AuthSignUpDto } from 'src/dtos/auth.dto';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: authServiceMock }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('signUp', () => {
    const signUpRequestPayload: AuthSignUpDto = {
      nome: 'teste',
      cargo: 'teste',
      cpf: 'teste',
      email: 'teste',
      matricula: 'teste',
      senha: 'teste',
      usuario_tipo_id: 1,
    };
    it('Deve resolver retornando payload do servico usuario', async () => {
      const authServiceResponse = 'resposta';
      const expectedControllerResponse = { message: 'success' };
      authServiceMock.signUp.mockResolvedValue(authServiceResponse);
      await expect(controller.signUp(signUpRequestPayload)).resolves.toEqual(
        expectedControllerResponse,
      );
    });
    it('Ao servico usuario falhar deve rejeitar jogando erro do servico', async () => {
      const erroGenerico = new Error('generico');
      authServiceMock.signUp.mockRejectedValue(erroGenerico);
      await expect(controller.signUp(signUpRequestPayload)).rejects.toThrow(
        erroGenerico,
      );
    });
  });
  describe('login', () => {
    const loginRequestPayload: AuthLoginDto = {
      usuario: 'teste',
      senha: 'teste',
    };

    it('Deve resolver retornando payload do servico Auth', async () => {
      const authServiceResponse = {
        token: 'token',
        tipo: 'Bearer',
        expira_em_milisegundos: 123,
        valido_ate_timestamp: 123,
        usuario: {},
        ultimo_login: null,
      };

      authServiceMock.signIn.mockResolvedValue(authServiceResponse);
      await expect(controller.login(loginRequestPayload)).resolves.toEqual(
        authServiceResponse,
      );
    });
    it('Ao servico auth falhar deve rejeitar jogando erro do servico ', async () => {
      const erroGenerico = new Error('generico');
      authServiceMock.signIn.mockRejectedValue(erroGenerico);
      await expect(controller.login(loginRequestPayload)).rejects.toThrow(
        erroGenerico,
      );
    });
  });
  describe('logout', () => {
    const logoutRequestToken = 'Bearer token';
    it('Deve resolver retornando payload do servico Auth', async () => {
      const authServiceResponse = 'resposta com sucesso';

      authServiceMock.logout.mockResolvedValue(authServiceResponse);
      await expect(controller.logout(logoutRequestToken)).resolves.toEqual(
        authServiceResponse,
      );
    });
    it('Ao servico auth falhar deve rejeitar jogando erro do servico ', async () => {
      const logoutRequestToken = 'Bearer token';
      const erroGenerico = new Error('generico');
      authServiceMock.logout.mockRejectedValue(erroGenerico);
      await expect(controller.logout(logoutRequestToken)).rejects.toThrow(
        erroGenerico,
      );
    });
  });
});
