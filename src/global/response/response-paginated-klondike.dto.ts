import { ApiProperty } from '@nestjs/swagger';
import { ResponseKlondikeDto } from './response-klondike.dto';
import { ResponsePaginatedDto } from './response-paginated.dto';

export class ResponsePaginatedKlondikeDto extends ResponsePaginatedDto {
  @ApiProperty({ type: [ResponseKlondikeDto] })
  Items: ResponseKlondikeDto[];
}
