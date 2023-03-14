import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { GuessWord } from './guess-word.entity';
import { GuessWordGuess } from './guess-word-guess.entity';
import { GuessWordGuessRating } from './guess-word-guess-rating.entity';
import { Word } from '../word/word.entity';
import { GuessWordService } from './guess-word.service';
import { GuessWordController } from './guess-word.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      GuessWord,
      GuessWordGuess,
      GuessWordGuessRating,
      Word,
      User,
    ]),
  ],
  providers: [GuessWordService],
  controllers: [GuessWordController],
})
export class GuessWordModule {}
