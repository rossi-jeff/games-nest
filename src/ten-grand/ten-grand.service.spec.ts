import { Test, TestingModule } from '@nestjs/testing';
import { TenGrandService } from './ten-grand.service';

describe('TenGrandService', () => {
  let service: TenGrandService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TenGrandService],
    }).compile();

    service = module.get<TenGrandService>(TenGrandService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
