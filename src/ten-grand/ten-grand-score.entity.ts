import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseModel } from '../global/base-model.abstract';
import { TenGrandCategory } from '../global/enum/ten-grand-category.enum';
import { TenGrandTurn } from './ten-grand-turn.entity';

@Entity()
export class TenGrandScore extends BaseModel {
  @Column()
  Dice: string;

  @Column({ type: 'enum', enum: TenGrandCategory })
  Category: TenGrandCategory;

  @Column({ type: 'int', default: 0 })
  Score: number;

  @Column({ type: 'bigint', nullable: false })
  ten_grand_turn_id: number;

  @ManyToOne((type) => TenGrandTurn)
  @JoinColumn({ name: 'ten_grand_turn_id' })
  ten_grand_turn: TenGrandTurn;
}
