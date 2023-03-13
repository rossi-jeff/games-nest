import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseModel } from '../global/base-model.abstract';
import { GameStatus } from '../global/enum/game-status.enum';
import { User } from '../user/user.entity';
import { CodeBreakerCode } from './code-breaker-code.entity';
import { CodeBreakerGuess } from './code-breaker-guess.entity';

@Entity()
export class CodeBreaker extends BaseModel {
  @Column({ type: 'enum', enum: GameStatus })
  Status: GameStatus;

  @Column({ type: 'int' })
  Columns: number;

  @Column({ type: 'int' })
  Colors: number;

  @Column({ type: 'int', default: 0 })
  Score: number;

  @Column()
  Available: string;

  @Column({ type: 'bigint', nullable: true })
  user_id: number;

  @ManyToOne((type) => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany((type) => CodeBreakerCode, (cbc) => cbc.code_breaker)
  codes: CodeBreakerCode[];

  @OneToMany((type) => CodeBreakerGuess, (cbg) => cbg.code_breaker)
  guesses: CodeBreakerGuess[];
}
