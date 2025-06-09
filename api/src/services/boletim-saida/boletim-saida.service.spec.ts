import { Test, TestingModule } from '@nestjs/testing';
import { BoletimSaidaService } from './boletim-saida.service';

describe('BoletimSaidaService', () => {
  let service: BoletimSaidaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoletimSaidaService],
    }).compile();

    service = module.get<BoletimSaidaService>(BoletimSaidaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
