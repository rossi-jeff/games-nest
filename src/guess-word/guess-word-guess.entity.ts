import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseModel } from '../global/base-model.abstract';
import { GuessWordGuessRating } from './guess-word-guess-rating.entity';
import { GuessWord } from './guess-word.entity';

@Entity('guess_word_guesses')
export class GuessWordGuess extends BaseModel {
  @Column()
  Guess: string;

  @Column({ type: 'bigint', nullable: false })
  guess_word_id: number;

  @ManyToOne((type) => GuessWord)
  @JoinColumn({ name: 'guess_word_id' })
  guess_word: GuessWord;

  @OneToMany((type) => GuessWordGuessRating, (gwgr) => gwgr.guess_word_guess)
  ratings: GuessWordGuessRating[];
}
