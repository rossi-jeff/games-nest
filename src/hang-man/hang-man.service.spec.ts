import { Test, TestingModule } from '@nestjs/testing';
import { HangManService } from './hang-man.service';

describe('HangManService', () => {
  let service: HangManService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HangManService],
    }).compile();

    service = module.get<HangManService>(HangManService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
