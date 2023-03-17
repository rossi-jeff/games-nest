import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginatedQueryDto {
  @ApiPropertyOptional()
  Limit?: string;

  @ApiPropertyOptional()
  Offset?: string;
}