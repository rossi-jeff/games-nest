import { ApiProperty } from '@nestjs/swagger';
import { Navy, NavyArray } from '../enum/navy.enum';
import { ShipType, ShipTypeArray } from '../enum/ship-type.enum';
import { Target, TargetArray } from '../enum/target.enum';
import { ResponseBaseModelDto } from './response-base-model.dto';

export class ResponseSeaBattleTurnDto extends ResponseBaseModelDto {
  @ApiProperty({ enum: ShipTypeArray, nullable: true })
  ShipType: ShipType;

  @ApiProperty({ enum: NavyArray })
  Navy: Navy;

  @ApiProperty({ enum: TargetArray })
  Target: Target;

  @ApiProperty()
  Horizontal: string;

  @ApiProperty()
  Vertical: number;
}
