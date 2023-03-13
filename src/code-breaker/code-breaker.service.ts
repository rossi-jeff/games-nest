import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { CreateCodeBreakerDto } from '../global/dto/create-code-breaker.dto';
import { CodeBreaker } from './code-breaker.entity';
import { CodeBreakerCode } from './code-breaker-code.entity';
import { GameStatus } from '../global/enum/game-status.enum';
import { defaultLimit, defaultOffset } from '../global/constants';
import { ColorArray } from '../global/enum/color.enum';

@Injectable()
export class CodeBreakerService {
  constructor(
    @InjectRepository(CodeBreaker)
    private codeBreakerRepo: Repository<CodeBreaker>,
    @InjectRepository(CodeBreakerCode)
    private codeBreakerCodeRepo: Repository<CodeBreakerCode>,
  ) {}

  async paginatedCodeBreakers(query: { Limit?: string; Offset?: string }) {
    const { Limit, Offset } = query;
    const take = Limit ? parseInt(Limit) : defaultLimit;
    const skip = Offset ? parseInt(Offset) : defaultOffset;
    const where = { Status: Not(GameStatus.Playing) };
    const Items = await this.codeBreakerRepo.find({
      where,
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
    code_breaker.Status = GameStatus.Playing;
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
}
