import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { TenGrand } from './ten-grand.entity';
import { TenGrandTurn } from './ten-grand-turn.entity';
import { TenGrandScore } from './ten-grand-score.entity';
import { TenGrandService } from './ten-grand.service';
import { TenGrandController } from './ten-grand.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([TenGrand, TenGrandTurn, TenGrandScore, User]),
  ],
  providers: [TenGrandService],
  controllers: [TenGrandController],
})
export class TenGrandModule {}
