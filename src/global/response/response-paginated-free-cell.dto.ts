import { ApiProperty } from '@nestjs/swagger';
import { ResponseFreeCellDto } from './response-free-cell.dto';
import { ResponsePaginatedDto } from './response-paginated.dto';

export class ResponsePaginatedFreeCellDto extends ResponsePaginatedDto {
  @ApiProperty({ type: [ResponseFreeCellDto] })
  Items: ResponseFreeCellDto[];
}
