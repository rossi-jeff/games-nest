import { ApiProperty } from '@nestjs/swagger';

export class YachtRollDto {
  @ApiProperty({ type: 'array', items: { type: 'number' } })
  Keep: number[];
}
