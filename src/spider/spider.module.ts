import { Module } from '@nestjs/common';
import { SpiderService } from './spider.service';
import { SpiderController } from './spider.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Spider } from './spider.entity';
import { User } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Spider, User])],
  providers: [SpiderService],
  controllers: [SpiderController],
})
export class SpiderModule {}
