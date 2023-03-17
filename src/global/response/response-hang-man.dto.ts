import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { GameStatus, GameStatusArray } from '../enum/game-status.enum';
import { ResponseBaseModelDto } from './response-base-model.dto';
import { ResponseUserDto } from './response-user.dto';
import { ResponseWordDto } from './response-word.dto';

export class ResponseHangManDto extends ResponseBaseModelDto {
  @ApiProperty({ enum: GameStatusArray })
  Status: GameStatus;

  @ApiProperty()
  Correct: string;

  @ApiProperty()
  Wrong: string;

  @ApiProperty()
  Score: number;

  @ApiPropertyOptional({ type: ResponseUserDto })
  user: ResponseUserDto;

  @ApiPropertyOptional({ type: ResponseWordDto })
  word: ResponseWordDto;
}
