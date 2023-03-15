import { Module } from '@nestjs/common';
import { HangManService } from './hang-man.service';
import { HangManController } from './hang-man.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HangMan } from './hang-man.entity';
import { User } from '../user/user.entity';
import { Word } from '../word/word.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HangMan, User, Word])],
  providers: [HangManService],
  controllers: [HangManController],
})
export class HangManModule {}
