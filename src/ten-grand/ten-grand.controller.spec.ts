import { Test, TestingModule } from '@nestjs/testing';
import { TenGrandController } from './ten-grand.controller';

describe('TenGrandController', () => {
  let controller: TenGrandController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TenGrandController],
    }).compile();

    controller = module.get<TenGrandController>(TenGrandController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
