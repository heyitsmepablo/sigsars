import { Test, TestingModule } from '@nestjs/testing';
import { BoletimInternacaoOcupacaoController } from './boletim-internacao-ocupacao.controller';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { BoletimInternacaoOcupacaoCreateDto } from 'src/dtos/boletim-internacao-ocupacao.dto';
import { boletimInternacaoOcupacaoMock } from 'src/__mock__/services/boletim-internacao-ocupacao.service';
import { BoletimInternacaoOcupacaoService } from 'src/services/boletim-internacao-ocupacao/boletim-internacao-ocupacao.service';

describe('BoletimInternacaoOcupacaoController', () => {
  let controller: BoletimInternacaoOcupacaoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoletimInternacaoOcupacaoController],
      providers: [
        {
          provide: BoletimInternacaoOcupacaoService,
          useValue: boletimInternacaoOcupacaoMock,
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<BoletimInternacaoOcupacaoController>(
      BoletimInternacaoOcupacaoController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    const mockRequest: BoletimInternacaoOcupacaoCreateDto = {
      referente_ao_dia: new Date(),
      unidade_id: 1,
      usuario_responsavel_preenchimento_id: '',
      pacientes_enfermaria: 1,
      pacientes_enfermaria_isolamento: 1,
      pacientes_estabilizacao_vermelha: 1,
      pacientes_lsvp: 1,
      pacientes_uti: 1,
      pacientes_uti_isolamento: 1,
    };
    it('Deve resolver retornando com payload de sucesso na resposta', async () => {
      const mockServicePayloadResponse = { message: 'success' };

      boletimInternacaoOcupacaoMock.create.mockResolvedValue(
        mockServicePayloadResponse,
      );
      await expect(controller.create(mockRequest, 'uuid')).resolves.toEqual(
        mockServicePayloadResponse,
      );
    });
    it('Deve rejeitar jogando com erro na resposta', async () => {
      const expectedResponse = new Error('Erro Genereico');
      boletimInternacaoOcupacaoMock.create.mockRejectedValue(expectedResponse);
      await expect(controller.create(mockRequest, 'uuid')).rejects.toEqual(
        expectedResponse,
      );
    });
  });
});
