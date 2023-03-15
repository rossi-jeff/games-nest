import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { SeaBattle } from './sea-battle.entity';
import { SeaBattleShip } from './sea-battle-ship.entity';
import { SeaBattleTurn } from './sea-battle-turn.entity';
import { SeaBattleShipHit } from './sea-battle-ship-hit.entity';
import { SeaBattleShipGridPoint } from './sea-battle-ship-grid-point.entity';
import { SeaBattleService } from './sea-battle.service';
import { SeaBattleController } from './sea-battle.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SeaBattle,
      SeaBattleShip,
      SeaBattleTurn,
      SeaBattleShipHit,
      SeaBattleShipGridPoint,
      User,
    ]),
  ],
  providers: [SeaBattleService],
  controllers: [SeaBattleController],
})
export class SeaBattleModule {}
