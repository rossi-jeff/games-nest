import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Concentration } from './concentration.entity';
import { ConcentrationService } from './concentration.service';
import { ConcentrationController } from './concentration.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Concentration, User])],
  providers: [ConcentrationService],
  controllers: [ConcentrationController],
})
export class ConcentrationModule {}
