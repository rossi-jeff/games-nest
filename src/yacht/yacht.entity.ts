import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseModel } from '../global/base-model.abstract';
import { User } from '../user/user.entity';
import { YachtTurn } from './yacht-turn.entity';

@Entity('yachts')
export class Yacht extends BaseModel {
  @Column({ type: 'int', default: 0 })
  Total: number;

  @Column({ type: 'int', default: 0 })
  NumTurns: number;

  @Column({ type: 'bigint', nullable: true })
  user_id: number;

  @ManyToOne((type) => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany((type) => YachtTurn, (yt) => yt.yacht)
  turns: YachtTurn[];
}
