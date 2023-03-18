import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { CreateCodeBreakerDto } from '../global/dto/create-code-breaker.dto';
import { CodeBreaker } from './code-breaker.entity';
import { CodeBreakerCode } from './code-breaker-code.entity';
import { GameStatus } from '../global/enum/game-status.enum';
import { defaultLimit, defaultOffset } from '../global/constants';
import { ColorArray } from '../global/enum/color.enum';
import { CodeBreakerGuessDto } from '../global/dto/code-breaker-guess.dto';
import { CodeBreakerGuess } from './code-breaker-guess.entity';
import { CodeBreakerGuessColor } from './code-breaker-guess-color.entity';
import { CodeBreakerGuessKey } from './code-breaker-guess-key.entity';
import { Key } from '../global/enum/key.enum';
import {
  calculateCodeBreakerKeys,
  codeBreakerStatus,
} from './code-breaker-functions';

@Injectable()
export class CodeBreakerService {
  constructor(
    @InjectRepository(CodeBreaker)
    private codeBreakerRepo: Repository<CodeBreaker>,
    @InjectRepository(CodeBreakerCode)
    private codeBreakerCodeRepo: Repository<CodeBreakerCode>,
    @InjectRepository(CodeBreakerGuess)
    private codeBreakerGuessRepo: Repository<CodeBreakerGuess>,
    @InjectRepository(CodeBreakerGuessColor)
    private codeBreakerGuessColorRepo: Repository<CodeBreakerGuessColor>,
    @InjectRepository(CodeBreakerGuessKey)
    private codeBreakerGuessKeyRepo: Repository<CodeBreakerGuessKey>,
  ) {}

  async paginatedCodeBreakers(query: { Limit?: string; Offset?: string }) {
    const { Limit, Offset } = query;
    const take = Limit ? parseInt(Limit) : defaultLimit;
    const skip = Offset ? parseInt(Offset) : defaultOffset;
    const where = { Status: Not(GameStatus.Playing) };
    const Items = await this.codeBreakerRepo.find({
      where,
      order: { Score: 'DESC' },
      skip,
      take,
      relations: ['user'],
    });
    const Count = await this.codeBreakerRepo.count({ where });
    return { Items, Count, Limit: take, Offset: skip };
  }

  async inProgressCodeBreakers(user_id?: number) {
    if (user_id) {
      return await this.codeBreakerRepo.find({
        where: {
          user_id,
          Status: GameStatus.Playing,
        },
      });
    } else return [];
  }

  async getCodeBreakerById(id: number) {
    return await this.codeBreakerRepo.findOne({
      where: { id },
      relations: ['user', 'codes', 'guesses', 'guesses.colors', 'guesses.keys'],
    });
  }

  async createCodeBreaker(dto: CreateCodeBreakerDto, user_id?: number) {
    const { Colors, Columns } = dto;
    const code_breaker = new CodeBreaker();
    const now = new Date().toISOString();
    code_breaker.Columns = Columns;
    code_breaker.Colors = Colors.length;
    code_breaker.Available = Colors.join(',');
    code_breaker.user_id = user_id || null;
    code_breaker.created_at = now;
    code_breaker.updated_at = now;
    const saved = await this.codeBreakerRepo.save(code_breaker);
    if (saved && saved.id) {
      for (let c = 0; c < Columns; c++) {
        const code_breaker_code = new CodeBreakerCode();
        const color = Colors[Math.floor(Math.random() * Colors.length)];
        code_breaker_code.code_breaker_id = saved.id;
        code_breaker_code.Color = ColorArray.indexOf(color.toString());
        code_breaker_code.created_at = now;
        code_breaker_code.updated_at = now;
        await this.codeBreakerCodeRepo.save(code_breaker_code);
      }
    }
    return await this.getCodeBreakerById(saved.id);
  }

  async codeBreakerGuess(dto: CodeBreakerGuessDto, id: number) {
    const now = new Date().toISOString();
    const code_breaker_guess = new CodeBreakerGuess();
    code_breaker_guess.code_breaker_id = id;
    code_breaker_guess.created_at = now;
    code_breaker_guess.updated_at = now;
    const saved = await this.codeBreakerGuessRepo.save(code_breaker_guess);
    if (!saved)
      throw new HttpException(
        'Unable to Save Guess',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    const { Colors } = dto;
    const code = [];
    const colors = Colors.map((c) => c.toString());
    for (const color of colors) {
      const guess_color = new CodeBreakerGuessColor();
      guess_color.code_breaker_guess_id = saved.id;
      guess_color.Color = ColorArray.indexOf(color);
      guess_color.created_at = now;
      guess_color.updated_at = now;
      await this.codeBreakerGuessColorRepo.save(guess_color);
    }
    const columns = colors.length;
    const code_breaker_codes = await this.codeBreakerCodeRepo.find({
      where: { code_breaker_id: id },
    });
    for (const cbc of code_breaker_codes) {
      code.push(ColorArray[cbc.Color]);
    }
    const keys = calculateCodeBreakerKeys(code, colors);
    for (let i = 0; i < keys.black; i++) {
      const guess_key = new CodeBreakerGuessKey();
      guess_key.code_breaker_guess_id = saved.id;
      guess_key.Key = Key.Black;
      guess_key.created_at = now;
      guess_key.updated_at = now;
      await this.codeBreakerGuessKeyRepo.save(guess_key);
    }
    for (let i = 0; i < keys.white; i++) {
      const guess_key = new CodeBreakerGuessKey();
      guess_key.code_breaker_guess_id = saved.id;
      guess_key.Key = Key.White;
      guess_key.created_at = now;
      guess_key.updated_at = now;
      await this.codeBreakerGuessKeyRepo.save(guess_key);
    }
    const guesses = await this.codeBreakerGuessRepo.count({
      where: { code_breaker_id: id },
    });
    const status = codeBreakerStatus(keys.black, columns, guesses);
    if (status != GameStatus.Playing) {
      const score = await this.codeBreakerScore(id);
      await this.codeBreakerRepo
        .createQueryBuilder()
        .update(CodeBreaker)
        .set({ Status: status, Score: score })
        .where('id = :id', { id })
        .execute();
    }
    return await this.codeBreakerGuessRepo.findOne({
      where: { id: saved.id },
      relations: ['colors', 'keys'],
    });
  }

  async codeBreakerScore(id: number) {
    const perColumn = 10;
    const perColor = 10;
    const perBlack = 10;
    const perWhite = 5;
    let score = 0;
    const code_breaker = await this.codeBreakerRepo.findOne({
      where: { id },
      relations: ['guesses', 'guesses.keys'],
    });
    if (!code_breaker) return score;
    const colorBonus = perColor * code_breaker.Colors;
    const perGuess = perColumn * code_breaker.Columns;
    const maxGuesses = code_breaker.Columns * 2;
    score = maxGuesses * perGuess + colorBonus;
    for (const guess of code_breaker.guesses) {
      score -= perGuess;
      for (const key of guess.keys) {
        if (key.Key == Key.Black) {
          score += perBlack;
        } else if (key.Key == Key.White) {
          score += perWhite;
        }
      }
    }
    return score;
  }
}
