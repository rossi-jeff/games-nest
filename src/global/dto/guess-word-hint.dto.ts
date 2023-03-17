import { ApiProperty } from '@nestjs/swagger';

export class GuessWordHintDto {
  @ApiProperty()
  Length: number;

  @ApiProperty()
  Green: string[];

  @ApiProperty({
    type: 'array',
    items: { type: 'array', items: { type: 'string' } },
  })
  Brown: string[][];

  @ApiProperty()
  Gray: string[];
}
