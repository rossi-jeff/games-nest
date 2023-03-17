import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { GameStatus, GameStatusArray } from '../enum/game-status.enum';
import { ResponseBaseModelDto } from './response-base-model.dto';
import { ResponseGuessWordGuessDto } from './response-guess-word-guess.dto';
import { ResponseUserDto } from './response-user.dto';
import { ResponseWordDto } from './response-word.dto';

export class ResponseGuessWordDto extends ResponseBaseModelDto {
  @ApiProperty({ enum: GameStatusArray })
  Status: GameStatus;

  @ApiProperty()
  Score: number;

  @ApiPropertyOptional({ type: ResponseUserDto })
  user: ResponseUserDto;

  @ApiPropertyOptional({ type: ResponseWordDto })
  word: ResponseWordDto;

  @ApiPropertyOptional({ type: [ResponseGuessWordGuessDto] })
  guesses: ResponseGuessWordGuessDto[];
}
