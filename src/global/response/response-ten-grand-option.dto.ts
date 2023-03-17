import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  TenGrandCategory,
  TenGrandCategoryArray,
} from '../enum/ten-grand-category.enum';

export class ResponseTenGrandOptionDto {
  @ApiPropertyOptional({ enum: TenGrandCategoryArray })
  Category?: TenGrandCategory;

  @ApiPropertyOptional()
  Score?: number;
}

export class ResponseTenGrandOptionsDto {
  @ApiProperty({ type: 'array', items: { type: 'number' } })
  Dice: number[];

  @ApiProperty({ type: [ResponseTenGrandOptionDto] })
  Options: ResponseTenGrandOptionDto[];
}
