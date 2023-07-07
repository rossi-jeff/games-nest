import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GuessWord } from './guess-word.entity';
import { Not, Repository } from 'typeorm';
import { GuessWordGuess } from './guess-word-guess.entity';
import { GuessWordGuessRating } from './guess-word-guess-rating.entity';
import { Word } from '../word/word.entity';
import { defaultLimit, defaultOffset } from '../global/constants';
import { GameStatus } from '../global/enum/game-status.enum';
import { WordIdDto } from '../global/dto/word-id.dto';
import { GuessWordGuessDto } from '../global/dto/guess-word-guess.dto';
import { Rating } from '../global/enum/rating.enum';
import {
  guessWordStatus,
  includeAllBrown,
  matchBrown,
  matchGray,
  matchGreen,
} from './guess-word-functions';
import { GuessWordHintDto } from '../global/dto/guess-word-hint.dto';

@Injectable()
export class GuessWordService {
  constructor(
    @InjectRepository(GuessWord) private guessWordRepo: Repository<GuessWord>,
    @InjectRepository(GuessWordGuess)
    private guessWordGuessRepo: Repository<GuessWordGuess>,
    @InjectRepository(GuessWordGuessRating)
    private guessWordRatingRepo: Repository<GuessWordGuessRating>,
    @InjectRepository(Word) private wordRepo: Repository<Word>,
  ) {}

  async paginatedGuessWords(query: { Limit?: string; Offset?: string }) {
    const { Limit, Offset } = query;
    const take = Limit ? parseInt(Limit) : defaultLimit;
    const skip = Offset ? parseInt(Offset) : defaultOffset;
    const where = { Status: Not(GameStatus.Playing) };
    const Items = await this.guessWordRepo.find({
      where,
      order: { Score: 'DESC' },
      skip,
      take,
      relations: ['user', 'word'],
    });
    const Count = await this.guessWordRepo.count({ where });
    return { Items, Count, Limit: take, Offset: skip };
  }

  async inProgressGuessWords(user_id?: number) {
    if (user_id) {
      return await this.guessWordRepo.find({
        where: {
          user_id,
          Status: GameStatus.Playing,
        },
        relations: ['user'],
      });
    } else return [];
  }

  async getGuessWordById(id: number) {
    return await this.guessWordRepo.findOne({
      where: { id },
      relations: ['user', 'word', 'guesses', 'guesses.ratings'],
    });
  }

  async createGuessWord(dto: WordIdDto, user_id?: number) {
    const { WordId } = dto;
    const guess_word = new GuessWord();
    const now = new Date().toISOString();
    guess_word.word_id = WordId;
    guess_word.user_id = user_id || null;
    guess_word.created_at = now;
    guess_word.updated_at = now;
    const saved = await this.guessWordRepo.save(guess_word);
    return await this.getGuessWordById(saved.id);
  }

  async guessWordGuess(dto: GuessWordGuessDto, id: number) {
    const { Word, Guess } = dto;
    const guess_word_guess = new GuessWordGuess();
    const now = new Date().toISOString();
    guess_word_guess.guess_word_id = id;
    guess_word_guess.Guess = Guess;
    guess_word_guess.created_at = now;
    guess_word_guess.updated_at = now;
    const saved = await this.guessWordGuessRepo.save(guess_word_guess);
    const green = await this.guessWordGuessRatings(Word, Guess, saved.id);
    const count = await this.guessWordGuessRepo.count({
      where: { guess_word_id: id },
    });
    const status = guessWordStatus(green, Word.length, count);
    if (status != GameStatus.Playing) {
      await this.guessWordScore(id, Word.length, status);
    }
    return await this.guessWordGuessRepo.findOne({
      where: { id: saved.id },
      relations: ['ratings'],
    });
  }

  async guessWordHints(dto: GuessWordHintDto) {
    const { Length, Green, Brown, Gray } = dto;
    const words = await this.wordRepo.find({
      where: { Length },
      order: { Word: 'ASC' },
    });
    const hints: string[] = [];
    for (const word of words) {
      const { Word } = word;
      if (!matchGreen(Word, Green)) continue;
      if (matchBrown(Word, Brown)) continue;
      if (matchGray(Word, Gray, Green)) continue;
      if (!includeAllBrown(Word, Brown)) continue;
      hints.push(Word);
    }
    return hints;
  }

  async guessWordGuessRatings(Word: string, Guess: string, id: number) {
    const word: string[] = Word.split('');
    const guess: string[] = Guess.split('');
    const green: number[] = [];
    const brown: number[] = [];
    let letter: string;
    let idx: number;
    const now = new Date().toISOString();
    for (let i = word.length - 1; i >= 0; i--) {
      letter = guess[i];
      if (letter === word[i]) {
        green.push(i);
        word[i] = '';
      }
    }
    for (let i = Word.length - 1; i >= 0; i--) {
      if (green.includes(i)) continue;
      letter = guess[i];
      if (word.includes(letter)) {
        brown.push(i);
        idx = word.indexOf(letter);
        if (idx != -1) word[idx] = '';
      }
    }
    for (let i = 0; i < Word.length; i++) {
      let rating = Rating.Gray;
      if (green.includes(i)) {
        rating = Rating.Green;
      } else if (brown.includes(i)) {
        rating = Rating.Brown;
      }
      const guess_word_guess_rating = new GuessWordGuessRating();
      guess_word_guess_rating.guess_word_guess_id = id;
      guess_word_guess_rating.Rating = rating;
      guess_word_guess_rating.created_at = now;
      guess_word_guess_rating.updated_at = now;
      await this.guessWordRatingRepo.save(guess_word_guess_rating);
    }
    return green.length;
  }

  async guessWordScore(id: number, length: number, Status: GameStatus) {
    const perGreen = 10;
    const perBrown = 5;
    const perGuess = length * perGreen;
    const maxGuesses = Math.ceil((length * 3) / 2);
    let Score = perGuess * maxGuesses;
    const guesses = await this.guessWordGuessRepo.find({
      where: { guess_word_id: id },
      relations: ['ratings'],
    });
    for (const guess of guesses) {
      Score -= perGuess;
      for (const rating of guess.ratings) {
        if (rating.Rating == Rating.Green) Score += perGreen;
        if (rating.Rating == Rating.Brown) Score += perBrown;
      }
    }
    await this.guessWordRepo
      .createQueryBuilder()
      .update(GuessWord)
      .set({ Score, Status })
      .where('id = :id', { id })
      .execute();
  }
}
