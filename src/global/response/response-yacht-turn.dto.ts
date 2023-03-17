import { ApiProperty } from '@nestjs/swagger';
import { YachtCategory, YachtCategoryArray } from '../enum/yacht-category.enum';
import { ResponseBaseModelDto } from './response-base-model.dto';

export class ResponseYachtTurnDto extends ResponseBaseModelDto {
  @ApiProperty()
  RollOne: string;

  @ApiProperty()
  RollTwo: string;

  @ApiProperty()
  RollThree: string;

  @ApiProperty({ enum: YachtCategoryArray })
  Category: YachtCategory;

  @ApiProperty()
  Score: number;
}
