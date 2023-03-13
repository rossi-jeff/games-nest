import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseModel } from '../global/base-model.abstract';
import { Yacht } from './yacht.entity';

@Entity()
export class YachtTurn extends BaseModel {
  @Column({ nullable: true, default: '' })
  RollOne: string;

  @Column({ nullable: true, default: '' })
  RollTwo: string;

  @Column({ nullable: true, default: '' })
  RollThree: string;

  @Column({ type: 'int', default: 0 })
  Score: number;

  @Column({ type: 'bigint', nullable: false })
  yacht_id: number;

  @ManyToOne((type) => Yacht)
  @JoinColumn({ name: 'yacht_id' })
  yacht: Yacht;
}
