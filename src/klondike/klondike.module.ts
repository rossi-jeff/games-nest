import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Klondike } from './klondike.entity';
import { KlondikeService } from './klondike.service';
import { KlondikeController } from './klondike.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Klondike, User])],
  providers: [KlondikeService],
  controllers: [KlondikeController],
})
export class KlondikeModule {}
