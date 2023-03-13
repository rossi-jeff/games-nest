import { Column, Entity } from 'typeorm';
import { BaseModel } from '../global/base-model.abstract';
import * as bcrypt from 'bcrypt';

const SaltRounds = 10;

@Entity('users')
export class User extends BaseModel {
  @Column()
  UserName: string;

  @Column({ select: false })
  password_digest: string;

  validatePassword(password: string) {
    if (!password || !this.password_digest) return false;
    return bcrypt.compareSync(password, this.password_digest);
  }

  setEncryptedPassword(password: string) {
    this.password_digest = bcrypt.hashSync(password, SaltRounds);
  }
}
