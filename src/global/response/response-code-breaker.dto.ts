import { GameStatus } from '../enum/game-status.enum';
import { ResponseBaseModelDto } from './response-base-model.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ResponseUserDto } from './response-user.dto';
import { ResponseCodeBreakerCodeDto } from './response-code-breaker-code.dto';
import { ResponseCodeBreakerGuessDto } from './response-code-breaker-guess.dto';

export class ResponseCodeBreakerDto extends ResponseBaseModelDto {
  @ApiProperty()
  Status: GameStatus;

  @ApiProperty()
  Columns: number;

  @ApiProperty()
  Colors: number;

  @ApiProperty()
  Score: number;

  @ApiProperty()
  Available: string;

  @ApiPropertyOptional({ type: [ResponseUserDto] })
  user: ResponseUserDto;

  @ApiPropertyOptional({ type: [ResponseCodeBreakerCodeDto] })
  codes: ResponseCodeBreakerCodeDto[];

  @ApiPropertyOptional({ type: [ResponseCodeBreakerGuessDto] })
  guesses: ResponseCodeBreakerGuessDto[];
}
