import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { GameStatus, GameStatusArray } from '../enum/game-status.enum';
import { ResponseBaseModelDto } from './response-base-model.dto';
import { ResponseSeabattleShipDto } from './response-sea-battle-ship.dto';
import { ResponseSeaBattleTurnDto } from './response-sea-battle-turn.dto';
import { ResponseUserDto } from './response-user.dto';

export class ResponseSeaBattleDto extends ResponseBaseModelDto {
  @ApiProperty({ enum: GameStatusArray })
  Status: GameStatus;

  @ApiProperty()
  Score: number;

  @ApiProperty()
  Axis: number;

  @ApiPropertyOptional({ type: ResponseUserDto })
  user: ResponseUserDto;

  @ApiPropertyOptional({ type: [ResponseSeabattleShipDto] })
  ships: ResponseSeabattleShipDto[];

  @ApiPropertyOptional({ type: [ResponseSeaBattleTurnDto] })
  turns: ResponseSeaBattleTurnDto[];
}
