import { UsuarioService } from '../usuario/usuario.service';
import { argon2Mock } from 'src/__mock__/argon.mock';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { usuarioServiceMock } from 'src/__mock__/services/usuario.service';
import { UsuarioServiceCreateData } from 'src/dtos/usuario.dto';

jest.mock('argon2', () => argon2Mock);
describe('AuthService', () => {
  let service: AuthService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsuarioService, useValue: usuarioServiceMock },
      ],
    }).compile();
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('signUp', () => {
    const signUpData: UsuarioServiceCreateData = {
      nome: 'teste',
      cargo: 'teste',
      cpf: 'teste',
      email: 'teste',
      matricula: 'teste',
      senha: 'teste',
      usuario_tipo_id: 1,
    };
    it('Deve resolver retornando payload', async () => {
      const expectedResponse = { message: 'success' };
      argon2Mock.hash.mockResolvedValue('hash');
      usuarioServiceMock.create.mockResolvedValue('payload');
      await expect(service.signUp(signUpData)).resolves.toEqual(
        expectedResponse,
      );
    });
    it('Deve rejeitar jogando erro do argon', async () => {
      const expectedResponse = new Error('generico');
      argon2Mock.hash.mockRejectedValue(expectedResponse);
      await expect(service.signUp(signUpData)).rejects.toThrow(
        expectedResponse,
      );
    });
    it('Deve rejeitar jogando erro do servico do usuario', async () => {
      const expectedResponse = new Error('generico');
      argon2Mock.hash.mockResolvedValue('hash');
      usuarioServiceMock.create.mockRejectedValue(expectedResponse);
      await expect(service.signUp(signUpData)).rejects.toThrow(
        expectedResponse,
      );
    });
  });
  describe('signIn', () => {
    it('Deve resolver retornando payload', () => {
      expect(service.signIn()).toEqual('ok');
    });
  });
});
