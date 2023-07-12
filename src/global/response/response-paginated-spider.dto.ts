import { ApiProperty } from '@nestjs/swagger';
import { ResponsePaginatedDto } from './response-paginated.dto';
import { ResponseSpiderDto } from './response-spider.dto';

export class responsePaginatedSpiderDto extends ResponsePaginatedDto {
  @ApiProperty({ type: [ResponseSpiderDto] })
  Items: ResponseSpiderDto[];
}
