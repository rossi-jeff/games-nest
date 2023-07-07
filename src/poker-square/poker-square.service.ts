import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PokerSquare } from './poker-square.entity';
import { Not, Repository } from 'typeorm';
import { defaultLimit, defaultOffset } from '../global/constants';
import { GameStatus, GameStatusArray } from '../global/enum/game-status.enum';
import { UpdatePokerSquareDto } from '../global/dto/update-poker-square.dto';

@Injectable()
export class PokerSquareService {
  constructor(
    @InjectRepository(PokerSquare)
    private pokerSquareRepo: Repository<PokerSquare>,
  ) {}

  async paginatedPokerSquares(query: { Limit?: string; Offset?: string }) {
    const { Limit, Offset } = query;
    const take = Limit ? parseInt(Limit) : defaultLimit;
    const skip = Offset ? parseInt(Offset) : defaultOffset;
    const where = { Status: Not(GameStatus.Playing) };
    const Items = await this.pokerSquareRepo.find({
      where,
      order: { Status: 'DESC', Score: 'DESC' },
      skip,
      take,
      relations: ['user'],
    });
    const Count = await this.pokerSquareRepo.count({ where });
    return { Items, Count, Limit: take, Offset: skip };
  }

  async getPokerSquareById(id: number) {
    return await this.pokerSquareRepo.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async createPokerSquare(user_id?: number) {
    const poker_square = new PokerSquare();
    const now = new Date().toISOString();
    poker_square.user_id = user_id || null;
    poker_square.created_at = now;
    poker_square.updated_at = now;
    const saved = await this.pokerSquareRepo.save(poker_square);
    return await this.getPokerSquareById(saved.id);
  }

  async updatePokerSquare(dto: UpdatePokerSquareDto, id: number) {
    const { Score, Status } = dto;
    await this.pokerSquareRepo
      .createQueryBuilder()
      .update(PokerSquare)
      .set({ Score, Status: GameStatusArray.indexOf(Status.toString()) })
      .where('id = :id', { id })
      .execute();
    return await this.getPokerSquareById(id);
  }
}
