import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { YachtCategory, YachtCategoryArray } from '../enum/yacht-category.enum';
import { ResponseYachtTurnDto } from './response-yacht-turn.dto';

export class ResponseYachtScoreOptionDto {
  @ApiPropertyOptional({ enum: YachtCategoryArray })
  Category?: YachtCategory;

  @ApiPropertyOptional()
  Score?: number;
}

export class ResponseYachtRollDto {
  @ApiProperty({ type: ResponseYachtTurnDto })
  Turn: ResponseYachtTurnDto;

  @ApiProperty({ type: [ResponseYachtScoreOptionDto] })
  Options: ResponseYachtScoreOptionDto[];
}
