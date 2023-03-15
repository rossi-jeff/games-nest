import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseModel } from '../global/base-model.abstract';
import { Navy, NavyArray } from '../global/enum/navy.enum';
import { ShipType, ShipTypeArray } from '../global/enum/ship-type.enum';
import { Target, TargetArray } from '../global/enum/target.enum';
import { SeaBattle } from './sea-battle.entity';

@Entity('sea_battle_turns')
export class SeaBattleTurn extends BaseModel {
  @Column({ type: 'enum', enum: ShipType, nullable: true })
  ShipType: ShipType;

  @Column({ type: 'enum', enum: Navy })
  Navy: Navy;

  @Column({ type: 'enum', enum: Target })
  Target: Target;

  @Column()
  Horizontal: string;

  @Column({ type: 'int' })
  Vertical: number;

  @Column({ type: 'bigint', nullable: false })
  sea_battle_id: number;

  @ManyToOne((type) => SeaBattle)
  @JoinColumn({ name: 'sea_battle_id' })
  sea_battle: SeaBattle;

  toJSON() {
    return {
      ...this,
      Navy: NavyArray[this.Navy],
      ShipType: ShipTypeArray[this.ShipType],
      Target: TargetArray[this.Target],
    };
  }
}
