import { Test, TestingModule } from '@nestjs/testing';
import { PokerSquareController } from './poker-square.controller';

describe('PokerSquareController', () => {
  let controller: PokerSquareController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PokerSquareController],
    }).compile();

    controller = module.get<PokerSquareController>(PokerSquareController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
