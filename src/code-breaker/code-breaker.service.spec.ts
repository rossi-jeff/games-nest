import { Test, TestingModule } from '@nestjs/testing';
import { CodeBreakerService } from './code-breaker.service';

describe('CodeBreakerService', () => {
  let service: CodeBreakerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CodeBreakerService],
    }).compile();

    service = module.get<CodeBreakerService>(CodeBreakerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
