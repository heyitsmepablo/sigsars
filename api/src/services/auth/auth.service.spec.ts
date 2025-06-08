import { argon2Mock } from 'src/__mock__/argon.mock';
import msMock from 'src/__mock__/ms.mock';
import { UsuarioService } from '../usuario/usuario.service';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { usuarioServiceMock } from 'src/__mock__/services/usuario.service';
import { UsuarioServiceCreateData } from 'src/dtos/usuario.dto';
import { JwtService } from '@nestjs/jwt';
import { jwtServiceMock } from 'src/__mock__/services/jwt.service';
import { prismaMock } from 'src/__mock__/prisma-singleton';
import { Prisma } from 'generated/prisma';
import 'jest-extended';
import { ConfigService } from '@nestjs/config';
import { configServiceMock } from 'src/__mock__/services/config.service';
jest.mock('ms', () => ({
  __esModule: true,
  default: require('src/__mock__/ms.mock').default,
}));

jest.mock('argon2', () => argon2Mock);
describe('AuthService', () => {
  let service: AuthService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsuarioService, useValue: usuarioServiceMock },
        { provide: JwtService, useValue: jwtServiceMock },
        { provide: ConfigService, useValue: configServiceMock },
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
      configServiceMock.getOrThrow.mockReturnValue('env');
      argon2Mock.hash.mockResolvedValue('hash');
      usuarioServiceMock.create.mockResolvedValue('payload');
      await expect(service.signUp(signUpData)).resolves.toEqual(
        expectedResponse,
      );
    });
    it('Deve rejeitar jogando erro do argon', async () => {
      const expectedResponse = new Error('generico');
      configServiceMock.getOrThrow.mockReturnValue('env');
      argon2Mock.hash.mockRejectedValue(expectedResponse);
      await expect(service.signUp(signUpData)).rejects.toThrow(
        expectedResponse,
      );
    });
    it('Deve rejeitar jogando erro do servico do usuario', async () => {
      const expectedResponse = new Error('generico');
      configServiceMock.getOrThrow.mockReturnValue('env');
      argon2Mock.hash.mockResolvedValue('hash');
      usuarioServiceMock.create.mockRejectedValue(expectedResponse);
      await expect(service.signUp(signUpData)).rejects.toThrow(
        expectedResponse,
      );
    });
  });
  describe('signIn', () => {
    const signInArgs = { login: 'teste', senha: 'test' };
    const prismaResponsePayload: Prisma.usuarioGetPayload<{
      include: { acesso: true };
    }> = {
      id: 'uuid',
      cargo: 'teste',
      usuario_tipo_id: 1,
      matricula: 'teste',
      email: 'teste',
      cpf: 'teste',
      acesso: {
        id: 1,
        senha: 'teste',
        usuario_id: 'uuid',
        criado_em: null,
        atualizado_em: null,
        ultimo_login: null,
      },
      nome: 'teste',
      criado_em: null,
      atualizado_em: null,
    };
    it('Deve resolver retornando payload', async () => {
      prismaMock.usuario.findFirstOrThrow.mockResolvedValue(
        prismaResponsePayload,
      );
      argon2Mock.verify.mockResolvedValue(true);
      jwtServiceMock.signAsync.mockResolvedValue('token');
      configServiceMock.getOrThrow.mockReturnValue('env');
      msMock.mockReturnValue(36000);
      await expect(service.signIn(signInArgs)).resolves.toMatchObject({
        token: expect.toBeString(),
        tipo: 'Bearer',
        expira_dentro_de: expect.toBeNumber(),
        expira_em: expect.toBeNumber(),
        usuario: expect.anything(),
        ultimo_login: expect.toBeOneOf([null, expect.toBeDateString()]),
      });
    });
    it('Deve rejeitar caso prisma falhe jogando o erro', async () => {
      const erroGenerico = new Error('Generico');
      prismaMock.usuario.findFirstOrThrow.mockRejectedValue(erroGenerico);
      await expect(service.signIn(signInArgs)).rejects.toThrow(erroGenerico);
    });
    it('Deve rejeitar caso argon falhe jogando o erro', async () => {
      const erroGenerico = new Error('Generico');
      prismaMock.usuario.findFirstOrThrow.mockResolvedValue(
        prismaResponsePayload,
      );
      argon2Mock.verify.mockRejectedValue(erroGenerico);
      await expect(service.signIn(signInArgs)).rejects.toThrow(erroGenerico);
    });
    it('Deve rejeitar caso servico jwt falhe jogando o erro', async () => {
      const erroGenerico = new Error('Generico');
      prismaMock.usuario.findFirstOrThrow.mockResolvedValue(
        prismaResponsePayload,
      );
      argon2Mock.verify.mockResolvedValue(true);
      jwtServiceMock.signAsync.mockRejectedValue(erroGenerico);
      await expect(service.signIn(signInArgs)).rejects.toThrow(erroGenerico);
    });
    it('Deve rejeitar caso servico config falhe jogando o erro', async () => {
      const erroGenerico = new Error('Generico');
      configServiceMock.getOrThrow.mockImplementation(() => {
        throw erroGenerico;
      });
      prismaMock.usuario.findFirstOrThrow.mockResolvedValue(
        prismaResponsePayload,
      );
      argon2Mock.verify.mockResolvedValue(true);
      jwtServiceMock.signAsync.mockResolvedValue('token');
      await expect(service.signIn(signInArgs)).rejects.toThrow(erroGenerico);
    });
  });
});
