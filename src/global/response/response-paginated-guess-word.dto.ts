import { ApiProperty } from '@nestjs/swagger';
import { ResponseGuessWordDto } from './response-guess-word.dto';
import { ResponsePaginatedDto } from './response-paginated.dto';

export class ResponsePaginatedGuessWordDto extends ResponsePaginatedDto {
  @ApiProperty({ type: [ResponseGuessWordDto] })
  Items: ResponseGuessWordDto[];
}
