import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseModel } from '../global/base-model.abstract';
import { SeaBattleShip } from './sea-battle-ship.entity';

@Entity('sea_battle_ship_hits')
export class SeaBattleShipHit extends BaseModel {
  @Column()
  Horizontal: string;

  @Column({ type: 'int' })
  Vertical: number;

  @Column({ type: 'bigint', nullable: false })
  sea_battle_ship_id: number;

  @ManyToOne((type) => SeaBattleShip)
  @JoinColumn({ name: 'sea_battle_ship_id' })
  sea_battle_ship: SeaBattleShip;
}
