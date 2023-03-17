import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ResponseBaseModelDto } from './response-base-model.dto';
import { ResponseTenGrandScoreDto } from './response-ten-grand-score.dto';

export class ResponseTenGrandTurnDto extends ResponseBaseModelDto {
  @ApiProperty()
  Score: number;

  @ApiPropertyOptional({ type: [ResponseTenGrandScoreDto] })
  scores: ResponseTenGrandScoreDto;
}
