import { ApiProperty } from '@nestjs/swagger';

export class ResponsePaginatedDto {
  @ApiProperty()
  Count: number;

  @ApiProperty()
  Limit: number;

  @ApiProperty()
  Offset: number;
}
