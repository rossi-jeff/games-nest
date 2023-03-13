import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseModel } from '../global/base-model.abstract';
import { TenGrand } from './ten-grand.entity';

@Entity()
export class TenGrandTurn extends BaseModel {
  @Column({ type: 'int', default: 0 })
  Score: number;

  @Column({ type: 'bigint', nullable: false })
  ten_grand_id: number;

  @ManyToOne((type) => TenGrand)
  @JoinColumn({ name: 'ten_grand_id' })
  ten_grand: TenGrand;
}
