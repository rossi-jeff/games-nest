import { Test, TestingModule } from '@nestjs/testing';
import { FreeCellController } from './free-cell.controller';

describe('FreeCellController', () => {
  let controller: FreeCellController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FreeCellController],
    }).compile();

    controller = module.get<FreeCellController>(FreeCellController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
