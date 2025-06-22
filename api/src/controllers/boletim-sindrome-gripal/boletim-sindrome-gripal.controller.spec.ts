import { Test, TestingModule } from '@nestjs/testing';
import { BoletimSindromeGripalController } from './boletim-sindrome-gripal.controller';
import { boletimSindromeGripalServiceMock } from 'src/__mock__/services/boletim-sindrome-gripal.service';
import { BoletimSindromeGripalCreateDto } from 'src/dtos/boletim-sindrome-gripal.dto';
import { BoletimSindromeGripalService } from 'src/services/boletim-sindrome-gripal/boletim-sindrome-gripal.service';
import { AuthGuard } from 'src/guards/auth/auth.guard';

describe('BoletimSindromeGripalController', () => {
  let controller: BoletimSindromeGripalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoletimSindromeGripalController],
      providers: [
        {
          provide: BoletimSindromeGripalService,
          useValue: boletimSindromeGripalServiceMock,
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<BoletimSindromeGripalController>(
      BoletimSindromeGripalController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('findAll', () => {
    it('Deve resolver retornando com payload do servico na resposta', async () => {
      const serviceResponse = 'resposta do servico';
      boletimSindromeGripalServiceMock.findAll.mockResolvedValue(
        serviceResponse,
      );
      await expect(controller.findAll()).resolves.toEqual(serviceResponse);
    });
    it('Deve rejeitar jogando com erro na resposta', async () => {
      const expectedResponse = new Error('Erro Genereico');
      boletimSindromeGripalServiceMock.findAll.mockRejectedValue(
        expectedResponse,
      );
      await expect(controller.findAll()).rejects.toEqual(expectedResponse);
    });
  });
  describe('create', () => {
    const requestPayload = new BoletimSindromeGripalCreateDto();
    it('Deve resolver retornando com payload do servico na resposta', async () => {
      const serviceResponse = 'resposta do servico';
      boletimSindromeGripalServiceMock.create.mockResolvedValue(
        serviceResponse,
      );
      await expect(
        controller.create(requestPayload, 'usuario-id'),
      ).resolves.toEqual(serviceResponse);
    });
    it('Deve rejeitar jogando com erro na resposta', async () => {
      const expectedResponse = new Error('Erro Genereico');
      boletimSindromeGripalServiceMock.create.mockRejectedValue(
        expectedResponse,
      );
      await expect(
        controller.create(requestPayload, 'usuario-id'),
      ).rejects.toEqual(expectedResponse);
    });
  });
  describe('findOne', () => {
    const requestPayload = 1;
    it('Deve resolver retornando com payload do servico na resposta', async () => {
      const serviceResponse = 'resposta do servico';
      boletimSindromeGripalServiceMock.findOne.mockResolvedValue(
        serviceResponse,
      );
      await expect(controller.findOne(requestPayload)).resolves.toEqual(
        serviceResponse,
      );
    });
    it('Deve rejeitar jogando com erro na resposta', async () => {
      const expectedResponse = new Error('Erro Genereico');
      boletimSindromeGripalServiceMock.findOne.mockRejectedValue(
        expectedResponse,
      );
      await expect(controller.findOne(requestPayload)).rejects.toEqual(
        expectedResponse,
      );
    });
  });
});
