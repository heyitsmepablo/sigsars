// auth.guard.spec.ts
import {
  BadRequestException,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { ExecutionContext } from '@nestjs/common';
import { prismaMock } from 'src/__mock__/prisma-singleton';

// mocks
const mockJwtService = {
  verifyAsync: jest.fn(),
};

const mockRequest = {
  headers: {},
  usuario: null,
};

const mockContext = {
  switchToHttp: () => ({
    getRequest: () => mockRequest,
    getResponse: () => ({}), // pode ser um objeto vazio
    getNext: () => ({}), // idem
  }),
};

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    jest.clearAllMocks();
    guard = new AuthGuard(mockJwtService as any);
  });

  it('deve lançar BadRequestException se o header de autorização estiver ausente', async () => {
    mockRequest.headers = {};
    await expect(
      guard.canActivate(mockContext as ExecutionContext),
    ).rejects.toThrow(BadRequestException);
  });

  it('deve lançar ForbiddenException se o token estiver malformado', async () => {
    mockRequest.headers = { authorization: 'BadTokenFormat' };
    await expect(
      guard.canActivate(mockContext as ExecutionContext),
    ).rejects.toThrow(ForbiddenException);
  });

  it('deve lançar UnauthorizedException se o JWT for inválido', async () => {
    mockRequest.headers = { authorization: 'Bearer invalidtoken' };
    mockJwtService.verifyAsync = jest
      .fn()
      .mockRejectedValue(new Error('JWT inválido'));

    await expect(
      guard.canActivate(mockContext as ExecutionContext),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('deve lançar UnauthorizedException se o token não estiver no banco', async () => {
    mockRequest.headers = { authorization: 'Bearer validtoken' };
    mockJwtService.verifyAsync = jest.fn().mockResolvedValue({ id: 'user123' });
    prismaMock.token_de_acesso.findUnique.mockResolvedValue(null);

    await expect(
      guard.canActivate(mockContext as ExecutionContext),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('deve lançar UnauthorizedException se o token estiver expirado', async () => {
    mockRequest.headers = { authorization: 'Bearer validtoken' };
    mockJwtService.verifyAsync = jest.fn().mockResolvedValue({ id: 'user123' });

    prismaMock.token_de_acesso.findUnique.mockResolvedValue({
      id: 1,
      acesso_id: 1,
      atualizado_em: null,
      criado_em: null,
      expirado_em: null,
      token: 'teste',
      valido_ate: new Date(Date.now() - 1000),
    });

    await expect(
      guard.canActivate(mockContext as ExecutionContext),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('deve lançar UnauthorizedException se o token sofreu logout', async () => {
    mockRequest.headers = { authorization: 'Bearer validtoken' };
    mockJwtService.verifyAsync = jest.fn().mockResolvedValue({ id: 'user123' });

    prismaMock.token_de_acesso.findUnique.mockResolvedValue({
      id: 1,
      acesso_id: 1,
      atualizado_em: null,
      criado_em: null,
      expirado_em: new Date(Date.now() - 1000),
      token: 'teste',
      valido_ate: new Date(Date.now() + 1000),
    });

    await expect(
      guard.canActivate(mockContext as ExecutionContext),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('deve lançar ForbiddenException se o payload for inválido', async () => {
    mockRequest.headers = { authorization: 'Bearer validtoken' };
    mockJwtService.verifyAsync = jest.fn().mockResolvedValue({}); // sem id

    prismaMock.token_de_acesso.findUnique.mockResolvedValue({
      id: 1,
      acesso_id: 1,
      atualizado_em: null,
      criado_em: null,
      expirado_em: null,
      token: 'teste',
      valido_ate: new Date(Date.now() + 10000),
    });

    await expect(
      guard.canActivate(mockContext as ExecutionContext),
    ).rejects.toThrow(ForbiddenException);
  });

  it('deve autorizar e adicionar o usuário na request', async () => {
    const payload = { id: 'user123', email: 'user@example.com' };
    mockRequest.headers = { authorization: 'Bearer validtoken' };
    mockJwtService.verifyAsync = jest.fn().mockResolvedValue(payload);

    prismaMock.token_de_acesso.findUnique.mockResolvedValue({
      id: 1,
      acesso_id: 1,
      atualizado_em: null,
      criado_em: null,
      expirado_em: null,
      token: 'teste',
      valido_ate: new Date(Date.now() + 10000),
    });

    const result = await guard.canActivate(mockContext as ExecutionContext);

    expect(result).toBe(true);
    expect(mockRequest.usuario).toEqual(payload);
  });
});
