import { Module } from '@nestjs/common';
import { Yacht } from './yacht.entity';
import { YachtTurn } from './yacht-turn.entity';
import { User } from '../user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { YachtService } from './yacht.service';
import { YachtController } from './yacht.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Yacht, YachtTurn, User])],
  providers: [YachtService],
  controllers: [YachtController],
})
export class YachtModule {}
