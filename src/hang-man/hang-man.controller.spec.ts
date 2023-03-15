import { Test, TestingModule } from '@nestjs/testing';
import { HangManController } from './hang-man.controller';

describe('HangManController', () => {
  let controller: HangManController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HangManController],
    }).compile();

    controller = module.get<HangManController>(HangManController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
