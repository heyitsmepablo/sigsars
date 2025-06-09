import { Test, TestingModule } from '@nestjs/testing';
import { BoletimInternacaoAdmissaoService } from './boletim-internacao-admissao.service';

describe('BoletimInternacaoAdmissaoService', () => {
  let service: BoletimInternacaoAdmissaoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoletimInternacaoAdmissaoService],
    }).compile();

    service = module.get<BoletimInternacaoAdmissaoService>(BoletimInternacaoAdmissaoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
