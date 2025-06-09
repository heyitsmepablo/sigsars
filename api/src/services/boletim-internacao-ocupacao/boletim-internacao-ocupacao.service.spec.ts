import { Test, TestingModule } from '@nestjs/testing';
import { BoletimInternacaoOcupacaoService } from './boletim-internacao-ocupacao.service';

describe('BoletimInternacaoOcupacaoService', () => {
  let service: BoletimInternacaoOcupacaoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoletimInternacaoOcupacaoService],
    }).compile();

    service = module.get<BoletimInternacaoOcupacaoService>(BoletimInternacaoOcupacaoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
