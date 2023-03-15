import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { defaultLimit, defaultOffset } from '../global/constants';
import { UpdateKlondikeDto } from '../global/dto/update-klondike.dto';
import { GameStatus, GameStatusArray } from '../global/enum/game-status.enum';
import { Klondike } from './klondike.entity';

@Injectable()
export class KlondikeService {
  constructor(
    @InjectRepository(Klondike) private klondikeRepo: Repository<Klondike>,
  ) {}

  async paginatedKlondikes(query: { Limit?: string; Offset?: string }) {
    const { Limit, Offset } = query;
    const take = Limit ? parseInt(Limit) : defaultLimit;
    const skip = Offset ? parseInt(Offset) : defaultOffset;
    const where = { Status: Not(GameStatus.Playing) };
    const Items = await this.klondikeRepo.find({
      where,
      skip,
      take,
      relations: ['user'],
    });
    const Count = await this.klondikeRepo.count({ where });
    return { Items, Count, Limit: take, Offset: skip };
  }

  async getKlondikeById(id: number) {
    return await this.klondikeRepo.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async createKlondike(user_id?: number) {
    const klondike = new Klondike();
    const now = new Date().toISOString();
    klondike.user_id = user_id || null;
    klondike.created_at = now;
    klondike.updated_at = now;
    const saved = await this.klondikeRepo.save(klondike);
    return await this.getKlondikeById(saved.id);
  }

  async updateKlondike(dto: UpdateKlondikeDto, id: number) {
    const { Status, Moves, Elapsed } = dto;
    await this.klondikeRepo
      .createQueryBuilder()
      .update(Klondike)
      .set({
        Status: GameStatusArray.indexOf(Status.toString()),
        Moves,
        Elapsed,
      })
      .where('id = :id', { id })
      .execute();
    return await this.getKlondikeById(id);
  }
}
