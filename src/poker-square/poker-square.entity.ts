import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseModel } from '../global/base-model.abstract';
import { User } from '../user/user.entity';
import { GameStatus, GameStatusArray } from '../global/enum/game-status.enum';

@Entity('poker_squares')
export class PokerSquare extends BaseModel {
  @Column({ type: 'enum', enum: GameStatus })
  Status: GameStatus;

  @Column({ type: 'int', default: 0 })
  Score: number;

  @Column({ type: 'bigint', nullable: true })
  user_id: number;

  @ManyToOne((type) => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  toJSON() {
    return {
      ...this,
      Status: GameStatusArray[this.Status],
    };
  }
}
