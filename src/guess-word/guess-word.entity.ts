import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseModel } from '../global/base-model.abstract';
import { GameStatus } from '../global/enum/game-status.enum';
import { User } from '../user/user.entity';
import { Word } from '../word/word.entity';
import { GuessWordGuess } from './guess-word-guess.entity';

@Entity()
export class GuessWord extends BaseModel {
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

  @OneToMany((type) => GuessWordGuess, (gwg) => gwg.guess_word)
  guesses: GuessWordGuess[];
}
