import { ApiProperty } from '@nestjs/swagger';
import { ResponsePaginatedDto } from './response-paginated.dto';
import { ResponseYachtDto } from './response-yacht.dto';

export class ResponsePaginatedYachtDto extends ResponsePaginatedDto {
  @ApiProperty({ type: [ResponseYachtDto] })
  Items: ResponseYachtDto[];
}
