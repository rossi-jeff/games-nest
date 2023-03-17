import { ApiProperty } from '@nestjs/swagger';
import { ResponseHangManDto } from './response-hang-man.dto';
import { ResponsePaginatedDto } from './response-paginated.dto';

export class ResponsePaginatedHangManDto extends ResponsePaginatedDto {
  @ApiProperty({ type: [ResponseHangManDto] })
  Items: ResponseHangManDto[];
}
