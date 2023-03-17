import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Navy, NavyArray } from '../enum/navy.enum';
import { ShipType, ShipTypeArray } from '../enum/ship-type.enum';

export class PointDto {
  @ApiProperty()
  Horizontal: string;

  @ApiProperty()
  Vertical: number;
}

export class SeaBattleShipDto {
  @ApiProperty({ enum: NavyArray })
  Navy: Navy;

  @ApiProperty({ enum: ShipTypeArray })
  ShipType: ShipType;

  @ApiProperty()
  Size: number;

  @ApiPropertyOptional({ type: [PointDto] })
  Points?: PointDto[];
}
