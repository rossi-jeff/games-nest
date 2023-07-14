import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseModel } from '../global/base-model.abstract';
import { GameStatus, GameStatusArray } from '../global/enum/game-status.enum';
import { User } from '../user/user.entity';

@Entity('spiders')
export class Spider extends BaseModel {
  @Column({ type: 'enum', enum: GameStatus })
  Status: GameStatus;

  @Column({ type: 'int', default: 0 })
  Moves: number;

  @Column({ type: 'int', default: 0 })
  Elapsed: number;

  @Column({ type: 'int', default: 4 })
  Suits: number;

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
