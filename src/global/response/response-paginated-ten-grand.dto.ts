import { ApiProperty } from '@nestjs/swagger';
import { ResponsePaginatedDto } from './response-paginated.dto';
import { ResponseTenGrandDto } from './response-ten-grand.dto';

export class ResponsePaginatedTenGrandDto extends ResponsePaginatedDto {
  @ApiProperty({ type: [ResponseTenGrandDto] })
  Items: ResponseTenGrandDto[];
}
