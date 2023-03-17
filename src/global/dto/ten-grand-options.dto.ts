import { ApiProperty } from '@nestjs/swagger';

export class TenGrandOptionsDto {
  @ApiProperty({ type: 'array', items: { type: 'number' } })
  Dice: number[];
}
