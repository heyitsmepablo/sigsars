import { Test, TestingModule } from '@nestjs/testing';
import { FichaSpaController } from './ficha-spa.controller';

describe('FichaSpaController', () => {
  let controller: FichaSpaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FichaSpaController],
    }).compile();

    controller = module.get<FichaSpaController>(FichaSpaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
