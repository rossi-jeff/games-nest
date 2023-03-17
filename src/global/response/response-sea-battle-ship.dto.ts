import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Navy, NavyArray } from '../enum/navy.enum';
import { ShipType, ShipTypeArray } from '../enum/ship-type.enum';
import { ResponseBaseModelDto } from './response-base-model.dto';
import { SeaBattleShipGridPointDto } from './response-sea-battle-ship-grid-point.dto';
import { SeaBattleShipHitDto } from './response-sea-battle-ship-hit.dto';

export class ResponseSeabattleShipDto extends ResponseBaseModelDto {
  @ApiProperty({ enum: ShipTypeArray })
  Type: ShipType;

  @ApiProperty({ enum: NavyArray })
  Navy: Navy;

  @ApiProperty()
  Size: number;

  @ApiProperty()
  Sunk: boolean;

  @ApiPropertyOptional({ type: [SeaBattleShipHitDto] })
  hits: SeaBattleShipHitDto[];

  @ApiPropertyOptional({ type: [SeaBattleShipGridPointDto] })
  points: SeaBattleShipGridPointDto[];
}
