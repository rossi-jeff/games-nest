import { ApiProperty } from '@nestjs/swagger';

export class HangManGuessDto {
  @ApiProperty()
  Word: string;

  @ApiProperty()
  Letter: string;
}
