import { Test, TestingModule } from '@nestjs/testing';
import { BoletimInternacaoAdmissaoController } from './boletim-internacao-admissao.controller';
import { BoletimInternacaoAdmissaoCreateDto } from 'src/dtos/boletim-internacao-admissao.dto';
import { boletimInternacaoAdmissaoMock } from 'src/__mock__/services/boletim-internacao-admissao.service';
import { BoletimInternacaoAdmissaoService } from 'src/services/boletim-internacao-admissao/boletim-internacao-admissao.service';
import { AuthGuard } from 'src/guards/auth/auth.guard';

describe('BoletimInternacaoAdmissaoController', () => {
  let controller: BoletimInternacaoAdmissaoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoletimInternacaoAdmissaoController],
      providers: [
        {
          provide: BoletimInternacaoAdmissaoService,
          useValue: boletimInternacaoAdmissaoMock,
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true }) // mock do guard
      .compile();

    controller = module.get<BoletimInternacaoAdmissaoController>(
      BoletimInternacaoAdmissaoController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('create', () => {
    const mockRequest: BoletimInternacaoAdmissaoCreateDto = {
      referente_ao_dia: new Date(),
      unidade_id: 1,
      usuario_responsavel_preenchimento_id: 'uuid',
      items: [
        {
          cid_id: 1,
          boletim_internacao_admissao_id: 1,
          faixa_etaria: 'faixa',
          genero: 'F',
          numero_de_admissoes: 123123,
        },
      ],
    };
    it('Deve resolver retornando com payload de sucesso na resposta', async () => {
      const mockServicePayloadResponse = { message: 'success' };

      boletimInternacaoAdmissaoMock.create.mockResolvedValue(
        mockServicePayloadResponse,
      );
      await expect(controller.create(mockRequest, 'uuid')).resolves.toEqual(
        mockServicePayloadResponse,
      );
    });
    it('Deve rejeitar jogando com erro na resposta', async () => {
      const expectedResponse = new Error('Erro Genereico');
      boletimInternacaoAdmissaoMock.create.mockRejectedValue(expectedResponse);
      await expect(controller.create(mockRequest, 'uuid')).rejects.toEqual(
        expectedResponse,
      );
    });
  });
});
