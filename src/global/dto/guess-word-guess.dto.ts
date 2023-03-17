import { ApiProperty } from '@nestjs/swagger';

export class GuessWordGuessDto {
  @ApiProperty()
  Word: string;

  @ApiProperty()
  Guess: string;
}
