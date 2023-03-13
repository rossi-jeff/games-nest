import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseModel } from '../global/base-model.abstract';
import { Key, KeyArray } from '../global/enum/key.enum';
import { CodeBreakerGuess } from './code-breaker-guess.entity';

@Entity('code_breaker_guess_keys')
export class CodeBreakerGuesskey extends BaseModel {
  @Column({ type: 'enum', enum: Key })
  Key: Key;

  @Column({ type: 'bigint', nullable: false })
  code_breaker_guess_id: number;

  @ManyToOne((type) => CodeBreakerGuess)
  @JoinColumn({ name: 'code_breaker_guess_id' })
  code_breaker_guess: CodeBreakerGuess;

  toJSON() {
    return {
      ...this,
      Key: KeyArray[this.Key],
    };
  }
}
