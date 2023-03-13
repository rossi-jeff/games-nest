import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { CodeBreakerCode } from './code-breaker-code.entity';
import { CodeBreakerGuessColor } from './code-breaker-guess-color.entity';
import { CodeBreakerGuesskey } from './code-breaker-guess-key.entity';
import { CodeBreakerGuess } from './code-breaker-guess.entity';
import { CodeBreaker } from './code-breaker.entity';
import { CodeBreakerService } from './code-breaker.service';
import { CodeBreakerController } from './code-breaker.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CodeBreaker,
      CodeBreakerCode,
      CodeBreakerGuess,
      CodeBreakerGuessColor,
      CodeBreakerGuesskey,
      User,
    ]),
  ],
  providers: [CodeBreakerService],
  controllers: [CodeBreakerController],
})
export class CodeBreakerModule {}
