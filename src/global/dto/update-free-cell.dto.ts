import { ApiProperty } from '@nestjs/swagger';
import { GameStatus, GameStatusArray } from '../enum/game-status.enum';

export class UpdateFreeCellDto {
  @ApiProperty({ enum: GameStatusArray })
  Status: GameStatus;

  @ApiProperty()
  Moves: number;

  @ApiProperty()
  Elapsed: number;
}
