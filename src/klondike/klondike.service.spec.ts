import { Test, TestingModule } from '@nestjs/testing';
import { KlondikeService } from './klondike.service';

describe('KlondikeService', () => {
  let service: KlondikeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KlondikeService],
    }).compile();

    service = module.get<KlondikeService>(KlondikeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
