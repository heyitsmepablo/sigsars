import { Test, TestingModule } from '@nestjs/testing';
import { BoletimAtendimentoPortaController } from './boletim-atendimento-porta.controller';
import { BoletimAtendimentoPortaService } from 'src/services/boletim-atendimento-porta/boletim-atendimento-porta.service';
import { boletimAtendimentoPortaServiceMock } from 'src/__mock__/services/boletim-atendimento-porta.service';
import { BoletimAtendimentoPortaCreateDto } from 'src/dtos/boletim-atendimento-porta.dto';

describe('BoletimAtendimentoPortaController', () => {
  let controller: BoletimAtendimentoPortaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoletimAtendimentoPortaController],
      providers: [
        {
          provide: BoletimAtendimentoPortaService,
          useValue: boletimAtendimentoPortaServiceMock,
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true }) // mock do guard
      .compile();

    controller = module.get<BoletimAtendimentoPortaController>(
      BoletimAtendimentoPortaController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('create', () => {
    const mockRequest: BoletimAtendimentoPortaCreateDto = {
      boletim: {
        referente_ao_dia: new Date(),
        unidade_id: 1,
        usuario_responsavel_preenchimento_id: 'uuid',
      },
      items: [
        {
          causa_id: 1,
          faixa_etaria: 'teste',
          genero: 'F',
          numero_de_atendimentos: 11,
          origem: 'DEMANDA_ESPONTANEA_INTERIOR',
          turno: 'SERVICO_DIURNO',
        },
      ],
    };
    it('Deve resolver retornando com payload de sucesso na resposta', async () => {
      const mockServicePayloadResponse = { message: 'success' };

      boletimAtendimentoPortaServiceMock.create.mockResolvedValue(
        mockServicePayloadResponse,
      );
      await expect(controller.create(mockRequest)).resolves.toEqual(
        mockServicePayloadResponse,
      );
    });
    it('Deve rejeitar jogando com erro na resposta', async () => {
      const expectedResponse = new Error('Erro Genereico');
      boletimAtendimentoPortaServiceMock.create.mockRejectedValue(
        expectedResponse,
      );
      await expect(controller.create(mockRequest, 'uuid')).rejects.toEqual(
        expectedResponse,
      );
    });
  });
});
