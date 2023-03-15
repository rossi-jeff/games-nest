import { Test, TestingModule } from '@nestjs/testing';
import { SeaBattleService } from './sea-battle.service';

describe('SeaBattleService', () => {
  let service: SeaBattleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeaBattleService],
    }).compile();

    service = module.get<SeaBattleService>(SeaBattleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
