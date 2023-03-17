import { ApiProperty } from '@nestjs/swagger';
import { Rating, RatingArray } from '../enum/rating.enum';
import { ResponseBaseModelDto } from './response-base-model.dto';

export class ResponseGuessWordGuessRatingDto extends ResponseBaseModelDto {
  @ApiProperty({ enum: RatingArray })
  Rating: Rating;
}
