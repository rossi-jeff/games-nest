import { GameStatus } from '../enum/game-status.enum';

export class UpdateKlondikeDto {
  Status: GameStatus;
  Moves: number;
  Elapsed: number;
}
