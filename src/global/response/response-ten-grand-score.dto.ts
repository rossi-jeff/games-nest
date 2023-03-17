import { ApiProperty } from '@nestjs/swagger';
import {
  TenGrandCategory,
  TenGrandCategoryArray,
} from '../enum/ten-grand-category.enum';
import { ResponseBaseModelDto } from './response-base-model.dto';

export class ResponseTenGrandScoreDto extends ResponseBaseModelDto {
  @ApiProperty()
  Dice: string;

  @ApiProperty({ enum: TenGrandCategoryArray })
  Category: TenGrandCategory;

  @ApiProperty()
  Score: number;
}
