import { Test, TestingModule } from '@nestjs/testing';
import { AcessoService } from './acesso.service';
import { prismaMock } from 'src/__mock__/prisma-singleton';
import { Prisma } from 'generated/prisma';

describe('AcessoService', () => {
  let service: AcessoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AcessoService],
    }).compile();

    service = module.get<AcessoService>(AcessoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('findOne', () => {
    const serviceArgs = { usuario_id: 'uuid' };

    const prismaResponsePayload: Prisma.acessoGetPayload<{
      select: null;
      include: { usuario: true };
    }> = {
      id: 1,
      usuario_id: 'uuid',
      senha: 'teste',
      ultimo_login: null,
      atualizado_em: null,
      criado_em: null,
      usuario: {
        id: 'uuid',
        cargo: 'teste',
        email: 'teste',
        nome: 'teste',
        cpf: 'teste',
        matricula: 'teste',
        usuario_tipo_id: 1,
        criado_em: null,
        atualizado_em: null,
      },
    };
    it('Deve resolver retornando payload', async () => {
      prismaMock.acesso.findUniqueOrThrow.mockResolvedValue(
        prismaResponsePayload as unknown as Prisma.acessoGetPayload<true>,
      );

      await expect(service.findOne(serviceArgs)).resolves.toEqual(
        prismaResponsePayload,
      );
    });
    it('Deve rejeitar jogando erro no payload de resposta', async () => {
      const erroGenerico = new Error('generico');
      prismaMock.acesso.findUniqueOrThrow.mockRejectedValue(erroGenerico);
      await expect(service.findOne(serviceArgs)).rejects.toThrow(erroGenerico);
    });
  });
});
