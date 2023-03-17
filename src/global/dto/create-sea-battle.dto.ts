import { ApiProperty } from '@nestjs/swagger';

export class CreateSeaBattleDto {
  @ApiProperty()
  Axis: number;
}
