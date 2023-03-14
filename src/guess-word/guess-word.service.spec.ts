import { Test, TestingModule } from '@nestjs/testing';
import { GuessWordService } from './guess-word.service';

describe('GuessWordService', () => {
  let service: GuessWordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GuessWordService],
    }).compile();

    service = module.get<GuessWordService>(GuessWordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
