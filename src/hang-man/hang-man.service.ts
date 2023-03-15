import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HangMan } from './hang-man.entity';
import { Not, Repository } from 'typeorm';
import { defaultLimit, defaultOffset } from '../global/constants';
import { GameStatus } from '../global/enum/game-status.enum';
import { WordIdDto } from '../global/dto/word-id.dto';
import { HangManGuessDto } from '../global/dto/hang-man-guess.dto';
import { hangManStatus } from './hang-man-functions';

@Injectable()
export class HangManService {
  constructor(
    @InjectRepository(HangMan) private hangManRepo: Repository<HangMan>,
  ) {}

  async paginatedHangMen(query: { Limit?: string; Offset?: string }) {
    const { Limit, Offset } = query;
    const take = Limit ? parseInt(Limit) : defaultLimit;
    const skip = Offset ? parseInt(Offset) : defaultOffset;
    const where = { Status: Not(GameStatus.Playing) };
    const Items = await this.hangManRepo.find({
      where,
      order: { Score: 'DESC' },
      skip,
      take,
      relations: ['user', 'word'],
    });
    const Count = await this.hangManRepo.count({ where });
    return { Items, Count, Limit: take, Offset: skip };
  }

  async inProgressHangMen(user_id?: number) {
    if (user_id) {
      return await this.hangManRepo.find({
        where: {
          user_id,
          Status: GameStatus.Playing,
        },
      });
    } else return [];
  }

  async getHangManById(id: number) {
    return await this.hangManRepo.findOne({
      where: { id },
      relations: ['user', 'word'],
    });
  }

  async createHangMan(dto: WordIdDto, user_id?: number) {
    const { WordId } = dto;
    const hang_man = new HangMan();
    const now = new Date().toISOString();
    hang_man.word_id = WordId;
    hang_man.user_id = user_id || null;
    hang_man.Correct = '';
    hang_man.Wrong = '';
    hang_man.created_at = now;
    hang_man.updated_at = now;
    const saved = await this.hangManRepo.save(hang_man);
    return await this.getHangManById(saved.id);
  }

  async hangManGuess(dto: HangManGuessDto, id: number) {
    const { Word, Letter } = dto;
    const hang_man = await this.hangManRepo.findOne({ where: { id } });
    const correct: string[] = [
      ...new Set(hang_man.Correct.split(',').filter((l) => l.length === 1)),
    ];
    const wrong: string[] = [
      ...new Set(hang_man.Wrong.split(',').filter((l) => l.length === 1)),
    ];
    let Found = false;
    if (Word.includes(Letter)) {
      correct.push(Letter);
      Found = true;
    } else {
      wrong.push(Letter);
    }
    const status = hangManStatus(Word, correct, wrong);
    await this.updateHangMan(id, Word, correct, wrong, status);
    return { Found, Letter };
  }

  async updateHangMan(
    id: number,
    word: string,
    correct: string[],
    wrong: string[],
    Status: GameStatus,
  ) {
    let Score = 0;
    if (Status != GameStatus.Playing) {
      const letters: string[] = [
        ...new Set(word.split('').filter((l) => l.length === 1)),
      ];
      correct = [...new Set(correct)];
      wrong = [...new Set(wrong)];
      const perLetter = 10,
        perCorrect = 5;
      Score = Status === GameStatus.Won ? letters.length * perLetter : 0;
      Score += correct.length * perCorrect;
      Score -= wrong.length * perLetter;
    }
    await this.hangManRepo
      .createQueryBuilder()
      .update(HangMan)
      .set({
        Score,
        Status,
        Correct: [...new Set(correct)].join(','),
        Wrong: [...new Set(wrong)].join(','),
      })
      .where('id = :id', { id })
      .execute();
  }
}
