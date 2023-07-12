import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Spider } from './spider.entity';
import { Not, Repository } from 'typeorm';
import { defaultLimit, defaultOffset } from '../global/constants';
import { GameStatus, GameStatusArray } from '../global/enum/game-status.enum';
import { UpdateSpiderDto } from '../global/dto/update-spider.dto';

@Injectable()
export class SpiderService {
  constructor(
    @InjectRepository(Spider) private spiderRepo: Repository<Spider>,
  ) {}

  async paginatedSpiders(query: { Limit?: string; Offset?: string }) {
    const { Limit, Offset } = query;
    const take = Limit ? parseInt(Limit) : defaultLimit;
    const skip = Offset ? parseInt(Offset) : defaultOffset;
    const where = { Status: Not(GameStatus.Playing) };
    const Items = await this.spiderRepo.find({
      where,
      order: { Status: 'DESC', Moves: 'ASC' },
      skip,
      take,
      relations: ['user'],
    });
    const Count = await this.spiderRepo.count({ where });
    return { Items, Count, Limit: take, Offset: skip };
  }

  async getSpiderById(id: number) {
    return await this.spiderRepo.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async createSpider(user_id?: number) {
    const spider = new Spider();
    const now = new Date().toISOString();
    spider.user_id = user_id || null;
    spider.created_at = now;
    spider.updated_at = now;
    spider.Status = GameStatus.Playing;
    const saved = await this.spiderRepo.save(spider);
    return await this.getSpiderById(saved.id);
  }

  async updateSpider(dto: UpdateSpiderDto, id: number) {
    const { Status, Moves, Elapsed } = dto;
    await this.spiderRepo
      .createQueryBuilder()
      .update(Spider)
      .set({
        Status: GameStatusArray.indexOf(Status.toString()),
        Moves,
        Elapsed,
      })
      .where('id = :id', { id })
      .execute();
    return await this.getSpiderById(id);
  }
}
