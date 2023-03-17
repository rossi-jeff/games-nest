import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  TenGrandCategory,
  TenGrandCategoryArray,
} from '../enum/ten-grand-category.enum';

export class ScoreOption {
  @ApiPropertyOptional()
  Score?: number;

  @ApiPropertyOptional({ enum: TenGrandCategoryArray })
  Category?: TenGrandCategory;
}

export class TenGrandScoreDto {
  @ApiProperty()
  TurnId: number;

  @ApiProperty({ type: 'array', items: { type: 'number' } })
  Dice: number[];

  @ApiProperty({ type: [ScoreOption] })
  Options: ScoreOption[];
}
