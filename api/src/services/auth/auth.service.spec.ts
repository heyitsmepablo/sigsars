import { argon2Mock } from 'src/__mock__/argon.mock';
import msMock from 'src/__mock__/ms.mock';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { jwtServiceMock } from 'src/__mock__/services/jwt.service';
import { prismaMock } from 'src/__mock__/prisma-singleton';
import { Prisma } from 'generated/prisma';
import 'jest-extended';
import { ConfigService } from '@nestjs/config';
import { configServiceMock } from 'src/__mock__/services/config.service';
import {
  AuthServiceSignInArgs,
  AuthServiceSignUpData,
} from 'src/dtos/auth.dto';
import { BadRequestException } from '@nestjs/common';
jest.mock('ms', () => {
  return msMock;
});

jest.mock('argon2', () => argon2Mock);
describe('AuthService', () => {
  let service: AuthService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
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
    const prismaResponsePayload: Prisma.usuarioGetPayload<true> = {
      id: 'teste',
      nome: 'teste',
      cargo: 'teste',
      usuario_tipo_id: 1,
      cpf: 'teste',
      email: 'teste',
      matricula: 'teste',
      criado_em: null,
      atualizado_em: null,
    };

    const signUpData: AuthServiceSignUpData = {
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
      prismaMock.usuario.create.mockResolvedValue(prismaResponsePayload);

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
    it('Deve rejeitar jogando erro do prisma', async () => {
      const expectedResponse = new Error('generico');
      configServiceMock.getOrThrow.mockReturnValue('env');
      argon2Mock.hash.mockResolvedValue('hash');
      prismaMock.usuario.create.mockRejectedValue(expectedResponse);
      await expect(service.signUp(signUpData)).rejects.toThrow(
        expectedResponse,
      );
    });
  });
  describe('signIn', () => {
    const signInArgs: AuthServiceSignInArgs = {
      usuario: 'teste',
      senha: 'test',
    };

    const prismaUsuarioResponsePayload: Prisma.usuarioGetPayload<{
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

    const prismaTokenDeAcessoResponsePayload: Prisma.token_de_acessoGetPayload<true> =
      {
        id: 1,
        acesso_id: 1,
        token: 'string',
        valido_ate: new Date(Date.now()),
        expirado_em: null,
        atualizado_em: null,
        criado_em: null,
      };

    it('Deve resolver retornando payload', async () => {
      prismaMock.usuario.findFirstOrThrow.mockResolvedValue(
        prismaUsuarioResponsePayload,
      );
      prismaMock.token_de_acesso.create.mockResolvedValue(
        prismaTokenDeAcessoResponsePayload,
      );
      argon2Mock.verify.mockResolvedValue(true);
      jwtServiceMock.signAsync.mockResolvedValue('token');
      configServiceMock.getOrThrow.mockReturnValue('env');
      msMock.mockReturnValue(360000);
      await expect(service.signIn(signInArgs)).resolves.toMatchObject({
        token: expect.toBeString(),
        tipo: 'Bearer',
        expira_em_milisegundos: expect.toBeNumber(),
        valido_ate_timestamp: expect.toBeNumber(),
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
        prismaUsuarioResponsePayload,
      );
      argon2Mock.verify.mockRejectedValue(erroGenerico);
      await expect(service.signIn(signInArgs)).rejects.toThrow(erroGenerico);
    });
    it('Deve rejeitar caso servico jwt falhe jogando o erro', async () => {
      const erroGenerico = new Error('Generico');
      prismaMock.usuario.findFirstOrThrow.mockResolvedValue(
        prismaUsuarioResponsePayload,
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
        prismaUsuarioResponsePayload,
      );
      argon2Mock.verify.mockResolvedValue(true);
      jwtServiceMock.signAsync.mockResolvedValue('token');
      await expect(service.signIn(signInArgs)).rejects.toThrow(erroGenerico);
    });
  });

  describe('logout', () => {
    const logoutTokenJWTArg = 'Bearer token';

    const prismaTokenDeAcessoResponsePayload: Prisma.token_de_acessoGetPayload<true> =
      {
        id: 1,
        acesso_id: 1,
        token: 'string',
        valido_ate: new Date(Date.now()),
        expirado_em: null,
        criado_em: null,
        atualizado_em: null,
      };
    it('Deve resolver com retornando payload', async () => {
      const expectedServiceResponse = { message: 'success' };
      prismaMock.token_de_acesso.update.mockResolvedValue(
        prismaTokenDeAcessoResponsePayload,
      );
      await expect(service.logout(logoutTokenJWTArg)).resolves.toEqual(
        expectedServiceResponse,
      );
    });
    it('Deve falhar caso não tenha Bearer no token', async () => {
      const jwtMailFormed = 'token asdkasdkasdkasd';
      const expectedError = new BadRequestException('Tipo do token invalido');
      await expect(service.logout(jwtMailFormed)).rejects.toThrow(
        expectedError,
      );
    });
    it('Deve rejeitar caso prisma falhe jogando o erro', async () => {
      const erroGenerico = new Error('Generico');
      prismaMock.token_de_acesso.update.mockRejectedValue(erroGenerico);
      await expect(service.logout(logoutTokenJWTArg)).rejects.toThrow(
        erroGenerico,
      );
    });
  });
});
