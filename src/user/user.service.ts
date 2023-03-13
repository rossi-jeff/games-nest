import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async getUserById(id: number) {
    const found = await this.userRepo.findOne({
      where: { id },
    });
    return found;
  }

  async createUser(username: string, password: string) {
    const user: User = new User();
    user.UserName = username;
    user.setEncryptedPassword(password);
    await this.userRepo.save(user);
    return user;
  }

  async getUserByUserName(username: string) {
    return await this.userRepo
      .createQueryBuilder('user')
      .where('user.UserName = :username', { username })
      .addSelect('user.password_digest')
      .getOne();
  }
}
