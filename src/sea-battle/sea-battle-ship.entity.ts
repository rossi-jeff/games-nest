import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseModel } from '../global/base-model.abstract';
import { Navy } from '../global/enum/navy.enum';
import { ShipType } from '../global/enum/ship-type.enum';
import { SeaBattleShipGridPoint } from './sea-battle-ship-grid-point.entity';
import { SeaBattleShipHit } from './sea-battle-ship-hit.entity';
import { SeaBattle } from './sea-battle.entity';

@Entity()
export class SeaBattleShip extends BaseModel {
  @Column({ type: 'enum', enum: ShipType })
  Type: ShipType;

  @Column({ type: 'enum', enum: Navy })
  Navy: Navy;

  @Column({ type: 'int' })
  Size: number;

  @Column({ default: false })
  Sunk: boolean;

  @Column({ type: 'bigint', nullable: false })
  sea_battle_id: number;

  @ManyToOne((type) => SeaBattle)
  @JoinColumn({ name: 'sea_battle_id' })
  sea_battle: SeaBattle;

  @OneToMany((type) => SeaBattleShipGridPoint, (gwg) => gwg.sea_battle_ship)
  points: SeaBattleShipGridPoint[];

  @OneToMany((type) => SeaBattleShipHit, (gwg) => gwg.sea_battle_ship)
  hits: SeaBattleShipHit[];
}
