import { ApiProperty } from '@nestjs/swagger';
import { ResponsePaginatedDto } from './response-paginated.dto';
import { ResponsePokerSquareDto } from './response-poker-square.dro';

export class ResponsePaginatedPokerSquare extends ResponsePaginatedDto {
  @ApiProperty({ type: [ResponsePokerSquareDto] })
  Items: ResponsePokerSquareDto[];
}
