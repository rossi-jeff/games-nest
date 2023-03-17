import { ApiProperty } from '@nestjs/swagger';
import { YachtCategory, YachtCategoryArray } from '../enum/yacht-category.enum';

export class YachtScoreDto {
  @ApiProperty()
  TurnId: number;

  @ApiProperty({ enum: YachtCategoryArray })
  Category: YachtCategory;
}
