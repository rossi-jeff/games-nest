import { Test, TestingModule } from '@nestjs/testing';
import { KlondikeController } from './klondike.controller';

describe('KlondikeController', () => {
  let controller: KlondikeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KlondikeController],
    }).compile();

    controller = module.get<KlondikeController>(KlondikeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
