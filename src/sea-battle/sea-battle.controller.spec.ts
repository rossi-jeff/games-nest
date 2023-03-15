import { Test, TestingModule } from '@nestjs/testing';
import { SeaBattleController } from './sea-battle.controller';

describe('SeaBattleController', () => {
  let controller: SeaBattleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeaBattleController],
    }).compile();

    controller = module.get<SeaBattleController>(SeaBattleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
