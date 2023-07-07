import { Module } from '@nestjs/common';
import { PokerSquareService } from './poker-square.service';
import { PokerSquareController } from './poker-square.controller';
import { PokerSquare } from './poker-square.entity';
import { User } from '../user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PokerSquare, User])],
  providers: [PokerSquareService],
  controllers: [PokerSquareController],
})
export class PokerSquareModule {}
