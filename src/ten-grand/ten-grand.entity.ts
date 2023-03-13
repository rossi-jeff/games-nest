import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseModel } from '../global/base-model.abstract';
import { GameStatus } from '../global/enum/game-status.enum';
import { User } from '../user/user.entity';

@Entity()
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
}
