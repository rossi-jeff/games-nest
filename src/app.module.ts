import { Module } from '@nestjs/common';
import { WordModule } from './word/word.module';
import { UserModule } from './user/user.module';
import { GuessWordModule } from './guess-word/guess-word.module';
import { CodeBreakerModule } from './code-breaker/code-breaker.module';
import { ConcentrationModule } from './concentration/concentration.module';
import { FreeCellModule } from './free-cell/free-cell.module';
import { HangManModule } from './hang-man/hang-man.module';
import { KlondikeModule } from './klondike/klondike.module';
import { SeaBattleModule } from './sea-battle/sea-battle.module';
import { TenGrandModule } from './ten-grand/ten-grand.module';
import { YachtModule } from './yacht/yacht.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import DatabaseConfig from './database.config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(DatabaseConfig()),
    WordModule,
    UserModule,
    GuessWordModule,
    CodeBreakerModule,
    ConcentrationModule,
    FreeCellModule,
    HangManModule,
    KlondikeModule,
    SeaBattleModule,
    TenGrandModule,
    YachtModule,
  ],
})
export class AppModule {}
