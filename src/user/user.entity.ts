import { Column, Entity } from 'typeorm';
import { BaseModel } from '../global/base-model.abstract';

@Entity()
export class User extends BaseModel {
  @Column()
  UserName: string;

  @Column()
  password_digest: string;
}
