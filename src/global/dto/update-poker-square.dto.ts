import { ApiProperty } from '@nestjs/swagger';
import { GameStatus, GameStatusArray } from '../enum/game-status.enum';

export class UpdatePokerSquareDto {
  @ApiProperty({ enum: GameStatusArray })
  Status: GameStatus;

  @ApiProperty()
  Score: number;
}
