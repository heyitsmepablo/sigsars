import { Test, TestingModule } from '@nestjs/testing';
import { CausaSragController } from './causa_srag.controller';

describe('CausaSragController', () => {
  let controller: CausaSragController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CausaSragController],
    }).compile();

    controller = module.get<CausaSragController>(CausaSragController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
