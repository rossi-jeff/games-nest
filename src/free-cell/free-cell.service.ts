import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { defaultLimit, defaultOffset } from '../global/constants';
import { UpdateFreeCellDto } from '../global/dto/update-free-cell.dto';
import { GameStatus, GameStatusArray } from '../global/enum/game-status.enum';
import { FreeCell } from './free-cell.entity';

@Injectable()
export class FreeCellService {
  constructor(
    @InjectRepository(FreeCell) private freeCellRepo: Repository<FreeCell>,
  ) {}

  async paginatedFreeCells(query: { Limit?: string; Offset?: string }) {
    const { Limit, Offset } = query;
    const take = Limit ? parseInt(Limit) : defaultLimit;
    const skip = Offset ? parseInt(Offset) : defaultOffset;
    const where = { Status: Not(GameStatus.Playing) };
    const Items = await this.freeCellRepo.find({
      where,
      order: { Status: 'DESC', Moves: 'ASC' },
      skip,
      take,
      relations: ['user'],
    });
    const Count = await this.freeCellRepo.count({ where });
    return { Items, Count, Limit: take, Offset: skip };
  }

  async getFreecellById(id: number) {
    return await this.freeCellRepo.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async createFreeCell(user_id?: number) {
    const now = new Date().toISOString();
    const free_cell = new FreeCell();
    free_cell.user_id = user_id || null;
    free_cell.created_at = now;
    free_cell.updated_at = now;
    const saved = await this.freeCellRepo.save(free_cell);
    return await this.getFreecellById(saved.id);
  }

  async updateFreeCell(id: number, dto: UpdateFreeCellDto) {
    const { Status, Moves, Elapsed } = dto;
    await this.freeCellRepo
      .createQueryBuilder()
      .update(FreeCell)
      .set({
        Status: GameStatusArray.indexOf(Status.toString()),
        Moves,
        Elapsed,
      })
      .where('id = :id', { id })
      .execute();
    return await this.getFreecellById(id);
  }
}
