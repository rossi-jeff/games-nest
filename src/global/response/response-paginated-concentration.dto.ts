import { ApiProperty } from '@nestjs/swagger';
import { ResponseConcentrationDto } from './response-concentration.dto';
import { ResponsePaginatedDto } from './response-paginated.dto';

export class ResponsePaginatedConcentrationDto extends ResponsePaginatedDto {
  @ApiProperty({ type: [ResponseConcentrationDto] })
  Items: ResponseConcentrationDto[];
}
