import { Test, TestingModule } from '@nestjs/testing';
import { CausaController } from './causa.controller';

describe('CausaController', () => {
  let controller: CausaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CausaController],
    }).compile();

    controller = module.get<CausaController>(CausaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
