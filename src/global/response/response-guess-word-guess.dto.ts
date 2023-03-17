import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ResponseBaseModelDto } from './response-base-model.dto';
import { ResponseGuessWordGuessRatingDto } from './response-guess-word-guess-rating.dto';

export class ResponseGuessWordGuessDto extends ResponseBaseModelDto {
  @ApiProperty()
  Guess: string;

  @ApiPropertyOptional({ type: [ResponseGuessWordGuessRatingDto] })
  ratings: ResponseGuessWordGuessRatingDto[];
}
