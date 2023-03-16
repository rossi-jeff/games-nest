import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseModel } from '../global/base-model.abstract';
import { TenGrandScore } from './ten-grand-score.entity';
import { TenGrand } from './ten-grand.entity';

@Entity('ten_grand_turns')
export class TenGrandTurn extends BaseModel {
  @Column({ type: 'int', default: 0 })
  Score: number;

  @Column({ type: 'bigint', nullable: false })
  ten_grand_id: number;

  @ManyToOne((type) => TenGrand)
  @JoinColumn({ name: 'ten_grand_id' })
  ten_grand: TenGrand;

  @OneToMany((type) => TenGrandScore, (tgs) => tgs.ten_grand_turn)
  scores: TenGrandScore[];
}
