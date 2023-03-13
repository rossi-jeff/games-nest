import { Column, Entity } from 'typeorm';
import { BaseModel } from '../global/base-model.abstract';

@Entity('words')
export class Word extends BaseModel {
  @Column()
  Word: string;

  @Column({ type: 'int' })
  Length: number;
}
