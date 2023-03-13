import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseModel } from '../global/base-model.abstract';
import { Navy } from '../global/enum/navy.enum';
import { ShipType } from '../global/enum/ship-type.enum';
import { Target } from '../global/enum/target.enum';
import { SeaBattle } from './sea-battle.entity';

@Entity()
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
}
