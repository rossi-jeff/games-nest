import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseModel } from '../global/base-model.abstract';
import { CodeBreakerGuessColor } from './code-breaker-guess-color.entity';
import { CodeBreakerGuessKey } from './code-breaker-guess-key.entity';
import { CodeBreaker } from './code-breaker.entity';

@Entity('code_breaker_guesses')
export class CodeBreakerGuess extends BaseModel {
  @Column({ type: 'bigint', nullable: false })
  code_breaker_id: number;

  @ManyToOne((type) => CodeBreaker)
  @JoinColumn({ name: 'code_breaker_id' })
  code_breaker: CodeBreaker;

  @OneToMany((type) => CodeBreakerGuessColor, (cbgc) => cbgc.code_breaker_guess)
  colors: CodeBreakerGuessColor[];

  @OneToMany((type) => CodeBreakerGuessKey, (cbgk) => cbgk.code_breaker_guess)
  keys: CodeBreakerGuessKey[];
}
