import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Navy, NavyArray } from '../enum/navy.enum';

export class SeaBattleFireDto {
  @ApiProperty({ enum: NavyArray })
  Navy: Navy;

  @ApiPropertyOptional()
  Horizontal?: string;

  @ApiPropertyOptional()
  Vertical?: number;
}
