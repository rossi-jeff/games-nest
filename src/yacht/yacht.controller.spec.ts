import { Test, TestingModule } from '@nestjs/testing';
import { YachtController } from './yacht.controller';

describe('YachtController', () => {
  let controller: YachtController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [YachtController],
    }).compile();

    controller = module.get<YachtController>(YachtController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
