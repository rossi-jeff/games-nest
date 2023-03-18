import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Concentration } from './concentration.entity';
import { Not, Repository } from 'typeorm';
import { defaultLimit, defaultOffset } from '../global/constants';
import { GameStatus, GameStatusArray } from '../global/enum/game-status.enum';
import { UpdateConcentrationDto } from '../global/dto/update-concentration.dto';

@Injectable()
export class ConcentrationService {
  constructor(
    @InjectRepository(Concentration)
    private concentrationRepo: Repository<Concentration>,
  ) {}

  async paginatedConcentrations(query: { Limit?: string; Offset?: string }) {
    const { Limit, Offset } = query;
    const take = Limit ? parseInt(Limit) : defaultLimit;
    const skip = Offset ? parseInt(Offset) : defaultOffset;
    const where = { Status: Not(GameStatus.Playing) };
    const Items = await this.concentrationRepo.find({
      where,
      order: { Moves: 'DESC' },
      skip,
      take,
      relations: ['user'],
    });
    const Count = await this.concentrationRepo.count({ where });
    return { Items, Count, Limit: take, Offset: skip };
  }

  async getConcenrationById(id: number) {
    return await this.concentrationRepo.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async createConcentration(user_id?: number) {
    const now = new Date().toISOString();
    const concentration = new Concentration();
    concentration.user_id = user_id || null;
    concentration.created_at = now;
    concentration.updated_at = now;
    const saved = await this.concentrationRepo.save(concentration);
    return await this.getConcenrationById(saved.id);
  }

  async updateConcentration(id: number, dto: UpdateConcentrationDto) {
    const { Status, Matched, Moves, Elapsed } = dto;
    await this.concentrationRepo
      .createQueryBuilder()
      .update(Concentration)
      .set({
        Status: GameStatusArray.indexOf(Status.toString()),
        Matched,
        Moves,
        Elapsed,
      })
      .where('id = :id', { id })
      .execute();
    return await this.getConcenrationById(id);
  }
}
