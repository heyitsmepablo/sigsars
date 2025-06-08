import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioService } from './usuario.service';
import { Prisma } from 'generated/prisma';
import { prismaMock } from 'src/__mock__/prisma-singleton';
import {
  UsuarioServiceCreateData,
  UsuarioServiceFindOneWhereArg,
} from 'src/dtos/usuario.dto';

describe('UsuarioService', () => {
  let service: UsuarioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsuarioService],
    }).compile();

    service = module.get<UsuarioService>(UsuarioService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('create', () => {
    const createData: UsuarioServiceCreateData = {
      nome: 'teste',
      cargo: 'teste',
      senha: 'teste',
      cpf: 'teste',
      email: 'teste',
      matricula: 'teste',
      usuario_tipo_id: 1,
    };

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

    it('Deve resolver retornando payload', async () => {
      prismaMock.usuario.create.mockResolvedValue(prismaResponsePayload);
      await expect(service.create(createData)).resolves.toEqual(
        prismaResponsePayload,
      );
    });
  });
  describe('findOne', () => {
    const whereArg: UsuarioServiceFindOneWhereArg = {
      cpf: 'teste',
    };

    const prismaResponsePayload: Prisma.usuarioGetPayload<true> = {
      id: 'teste',
      nome: 'teste',
      cargo: 'teste',
      usuario_tipo_id: 1,
      cpf: 'text',
      email: 'teste',
      matricula: 'teste',
      criado_em: null,
      atualizado_em: null,
    };

    it('Deve resolver retornando payload', async () => {
      prismaMock.usuario.findUniqueOrThrow.mockResolvedValue(
        prismaResponsePayload,
      );
      await expect(service.findOne(whereArg)).resolves.toEqual(
        prismaResponsePayload,
      );
    });
    it('Deve rejeitar jogando erro no payload de resposta', async () => {
      const erroGenerico = new Error('generico');
      prismaMock.usuario.findUniqueOrThrow.mockRejectedValue(erroGenerico);
      await expect(service.findOne(whereArg)).rejects.toThrow(erroGenerico);
    });
  });
});
