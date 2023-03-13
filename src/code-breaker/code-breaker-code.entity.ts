import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseModel } from '../global/base-model.abstract';
import { Color } from '../global/enum/color.enum';
import { CodeBreaker } from './code-breaker.entity';

@Entity()
export class CodeBreakerCode extends BaseModel {
  @Column({ type: 'enum', enum: Color })
  Color: Color;

  @Column({ type: 'bigint', nullable: false })
  code_breaker_id: number;

  @ManyToOne((type) => CodeBreaker)
  @JoinColumn({ name: 'code_breaker_id' })
  code_breaker: CodeBreaker;
}
