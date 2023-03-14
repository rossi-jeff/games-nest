import { GameStatus } from '../enum/game-status.enum';

export class UpdateConcentrationDto {
  Status: GameStatus;
  Moves: number;
  Elapsed: number;
  Matched: number;
}
