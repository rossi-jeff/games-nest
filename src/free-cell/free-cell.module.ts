import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { FreeCell } from './free-cell.entity';
import { FreeCellService } from './free-cell.service';
import { FreeCellController } from './free-cell.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FreeCell, User])],
  providers: [FreeCellService],
  controllers: [FreeCellController],
})
export class FreeCellModule {}
