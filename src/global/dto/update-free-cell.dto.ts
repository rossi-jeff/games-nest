import { GameStatus } from '../enum/game-status.enum';

export class UpdateFreeCellDto {
  Status: GameStatus;
  Moves: number;
  Elapsed: number;
}
