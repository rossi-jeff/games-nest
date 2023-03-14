import { Test, TestingModule } from '@nestjs/testing';
import { CodeBreakerController } from './code-breaker.controller';

describe('CodeBreakerController', () => {
  let controller: CodeBreakerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CodeBreakerController],
    }).compile();

    controller = module.get<CodeBreakerController>(CodeBreakerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
