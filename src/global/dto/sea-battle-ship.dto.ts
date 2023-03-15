import { Navy } from '../enum/navy.enum';
import { ShipType } from '../enum/ship-type.enum';

export class PointDto {
  Horizontal: string;
  Vertical: number;
}

export class SeaBattleShipDto {
  Navy: Navy;
  ShipType: ShipType;
  Size: number;
  Points?: PointDto[];
}
