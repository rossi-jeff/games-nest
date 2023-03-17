import { ApiPropertyOptional } from '@nestjs/swagger';

export class RandomWordDto {
  @ApiPropertyOptional()
  Length?: number;

  @ApiPropertyOptional()
  Min?: number;

  @ApiPropertyOptional()
  Max?: number;
}
