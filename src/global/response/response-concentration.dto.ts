import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { GameStatus, GameStatusArray } from '../enum/game-status.enum';
import { ResponseBaseModelDto } from './response-base-model.dto';
import { ResponseUserDto } from './response-user.dto';

export class ResponseConcentrationDto extends ResponseBaseModelDto {
  @ApiProperty({ enum: GameStatusArray })
  Status: GameStatus;

  @ApiProperty()
  Moves: number;

  @ApiProperty()
  Matched: number;

  @ApiProperty()
  Elapsed: number;

  @ApiPropertyOptional({ type: ResponseUserDto })
  user: ResponseUserDto;
}
