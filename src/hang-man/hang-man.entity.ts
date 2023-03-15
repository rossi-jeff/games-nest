import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseModel } from '../global/base-model.abstract';
import { GameStatus, GameStatusArray } from '../global/enum/game-status.enum';
import { User } from '../user/user.entity';
import { Word } from '../word/word.entity';

@Entity('hang_men')
export class HangMan extends BaseModel {
  @Column()
  Correct: string;

  @Column()
  Wrong: string;

  @Column({ type: 'enum', enum: GameStatus })
  Status: GameStatus;

  @Column({ type: 'int', default: 0 })
  Score: number;

  @Column({ type: 'bigint', nullable: true })
  user_id: number;

  @Column({ type: 'bigint', nullable: false })
  word_id: number;

  @ManyToOne((type) => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne((type) => Word)
  @JoinColumn({ name: 'word_id' })
  word: Word;

  toJSON() {
    return {
      ...this,
      Status: GameStatusArray[this.Status],
    };
  }
}
