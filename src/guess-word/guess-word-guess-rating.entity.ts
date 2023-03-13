import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseModel } from '../global/base-model.abstract';
import { Rating } from '../global/enum/rating.enum';
import { GuessWordGuess } from './guess-word-guess.entity';

@Entity()
export class GuessWordGuessRating extends BaseModel {
  @Column({ type: 'enum', enum: Rating })
  Rating: Rating;

  @Column({ type: 'bigint', nullable: false })
  guess_word_guess_id: number;

  @ManyToOne((type) => GuessWordGuess)
  @JoinColumn({ name: 'guess_word_guess_id' })
  guess_word_guess: GuessWordGuess;
}
