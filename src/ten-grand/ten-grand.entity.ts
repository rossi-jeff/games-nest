import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseModel } from '../global/base-model.abstract';
import { GameStatus, GameStatusArray } from '../global/enum/game-status.enum';
import { User } from '../user/user.entity';
import { TenGrandTurn } from './ten-grand-turn.entity';

@Entity('ten_grands')
export class TenGrand extends BaseModel {
  @Column({ type: 'enum', enum: GameStatus })
  Status: GameStatus;

  @Column({ type: 'int', default: 0 })
  Score: number;

  @Column({ type: 'bigint', nullable: true })
  user_id: number;

  @ManyToOne((type) => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany((type) => TenGrandTurn, (tgt) => tgt.ten_grand)
  turns: TenGrandTurn[];

  toJSON() {
    return {
      ...this,
      Status: GameStatusArray[this.Status],
    };
  }
}
