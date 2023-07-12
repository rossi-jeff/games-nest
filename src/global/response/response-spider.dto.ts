import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ResponseBaseModelDto } from './response-base-model.dto';
import { GameStatus, GameStatusArray } from '../enum/game-status.enum';
import { ResponseUserDto } from './response-user.dto';

export class ResponseSpiderDto extends ResponseBaseModelDto {
  @ApiProperty({ enum: GameStatusArray })
  Status: GameStatus;

  @ApiProperty()
  Moves: number;

  @ApiProperty()
  Elapsed: number;

  @ApiPropertyOptional({ type: ResponseUserDto })
  user: ResponseUserDto;
}
