import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseModel } from '../global/base-model.abstract';
import { Color } from '../global/enum/color.enum';
import { CodeBreakerGuess } from './code-breaker-guess.entity';

@Entity()
export class CodeBreakerGuessColor extends BaseModel {
  @Column({ type: 'enum', enum: Color })
  Color: Color;

  @Column({ type: 'bigint', nullable: false })
  code_breaker_guess_id: number;

  @ManyToOne((type) => CodeBreakerGuess)
  @JoinColumn({ name: 'code_breaker_guess_id' })
  code_breaker_guess: CodeBreakerGuess;
}
