import { Test, TestingModule } from '@nestjs/testing';
import { GuessWordController } from './guess-word.controller';

describe('GuessWordController', () => {
  let controller: GuessWordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GuessWordController],
    }).compile();

    controller = module.get<GuessWordController>(GuessWordController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
