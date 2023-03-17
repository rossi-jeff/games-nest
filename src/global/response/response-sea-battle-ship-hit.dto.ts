import { ApiProperty } from '@nestjs/swagger';
import { ResponseBaseModelDto } from './response-base-model.dto';

export class SeaBattleShipHitDto extends ResponseBaseModelDto {
  @ApiProperty()
  Horizontal: string;

  @ApiProperty()
  Vertical: number;
}
