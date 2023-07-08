import { Test, TestingModule } from '@nestjs/testing';
import { PokerSquareService } from './poker-square.service';

describe('PokerSquareService', () => {
  let service: PokerSquareService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PokerSquareService],
    }).compile();

    service = module.get<PokerSquareService>(PokerSquareService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
