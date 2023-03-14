import { Test, TestingModule } from '@nestjs/testing';
import { FreeCellService } from './free-cell.service';

describe('FreeCellService', () => {
  let service: FreeCellService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FreeCellService],
    }).compile();

    service = module.get<FreeCellService>(FreeCellService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
