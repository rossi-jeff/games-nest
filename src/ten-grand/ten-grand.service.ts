import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { defaultLimit, defaultOffset } from '../global/constants';
import { TenGrandOptionsDto } from '../global/dto/ten-grand-options.dto';
import { TenGrandRollDto } from '../global/dto/ten-grand-roll.dto';
import { TenGrandScoreDto } from '../global/dto/ten-grand-score.dto';
import { GameStatus } from '../global/enum/game-status.enum';
import {
  TenGrandCategory,
  TenGrandCategoryArray,
} from '../global/enum/ten-grand-category.enum';
import {
  getCategoryScoreAndDice,
  getTenGrandOptions,
  sortByDicerequired,
  sortByScore,
} from './ten-grand-functions';
import { TenGrandScore } from './ten-grand-score.entity';
import { TenGrandTurn } from './ten-grand-turn.entity';
import { TenGrand } from './ten-grand.entity';

@Injectable()
export class TenGrandService {
  constructor(
    @InjectRepository(TenGrand) private tenGrandRepo: Repository<TenGrand>,
    @InjectRepository(TenGrandTurn)
    private tenGrandTurnRepo: Repository<TenGrandTurn>,
    @InjectRepository(TenGrandScore)
    private tenGrandScoreRepo: Repository<TenGrandScore>,
  ) {}

  async paginatedTenGrands(query: { Limit?: string; Offset?: string }) {
    const { Limit, Offset } = query;
    const take = Limit ? parseInt(Limit) : defaultLimit;
    const skip = Offset ? parseInt(Offset) : defaultOffset;
    const where = { Status: Not(GameStatus.Playing) };
    const Items = await this.tenGrandRepo.find({
      where,
      order: { Score: 'DESC' },
      skip,
      take,
      relations: ['user'],
    });
    const Count = await this.tenGrandRepo.count({ where });
    return { Items, Count, Limit: take, Offset: skip };
  }

  async inProgressTenGrands(user_id?: number) {
    if (user_id) {
      return await this.tenGrandRepo.find({
        where: {
          user_id,
          Status: GameStatus.Playing,
        },
        relations: ['turns'],
      });
    } else return [];
  }

  async getTenGrandById(id: number) {
    return await this.tenGrandRepo.findOne({
      where: { id },
      relations: ['user', 'turns', 'turns.scores'],
    });
  }

  async createTenGrand(user_id?: number) {
    const ten_grand = new TenGrand();
    const now = new Date().toISOString();
    ten_grand.user_id = user_id || null;
    ten_grand.created_at = now;
    ten_grand.updated_at = now;
    const saved = await this.tenGrandRepo.save(ten_grand);
    return await this.getTenGrandById(saved.id);
  }

  async tenGrandRoll(dto: TenGrandRollDto) {
    const { Quantity } = dto;
    const dice: number[] = [];
    while (dice.length < Quantity) dice.push(Math.ceil(Math.random() * 6));
    return dice;
  }

  async tenGrandOptions(dto: TenGrandOptionsDto) {
    const { Dice } = dto;
    const Options = getTenGrandOptions(Dice);
    Options.sort(sortByScore);
    return { Dice, Options };
  }

  async tenGrandScore(dto: TenGrandScoreDto, id: number) {
    const { TurnId, Dice, Options } = dto;
    let turn: TenGrandTurn;
    const now = new Date().toISOString();
    if (TurnId > 0) {
      turn = await this.tenGrandTurnRepo.findOne({
        where: { id: TurnId },
        relations: ['scores'],
      });
    } else {
      const turn_opts = new TenGrandTurn();
      turn_opts.ten_grand_id = id;
      turn_opts.created_at = now;
      turn_opts.updated_at = now;
      turn_opts.Score = 0;
      turn = await this.tenGrandTurnRepo.save(turn_opts);
    }
    Options.sort(sortByDicerequired);
    for (const option of Options) {
      const { Score, Used } = getCategoryScoreAndDice(option.Category, Dice);
      for (const face of Used) {
        const idx = Dice.indexOf(face);
        if (idx !== -1) Dice.splice(idx, 1);
      }
      const ten_grand_score = new TenGrandScore();
      ten_grand_score.ten_grand_turn_id = turn.id;
      ten_grand_score.Dice = Used.join(',');
      ten_grand_score.Score = Score;
      ten_grand_score.Category = TenGrandCategoryArray.indexOf(
        option.Category.toString(),
      );
      ten_grand_score.created_at = now;
      ten_grand_score.updated_at = now;
      await this.tenGrandScoreRepo.save(ten_grand_score);
    }
    await this.updateTenGrandTurnScore(turn.id);
    await this.updateTenGrandScore(id);
    return await this.getTenGrandTurnById(turn.id);
  }

  async updateTenGrandTurnScore(id: number) {
    let Score = 0;
    let crapOut = false;
    const scores = await this.tenGrandScoreRepo.find({
      where: { ten_grand_turn_id: id },
    });
    for (const score of scores) {
      Score += score.Score || 0;
      if (score.Category == TenGrandCategory.CrapOut) crapOut = true;
    }
    if (crapOut) Score = 0;
    await this.tenGrandTurnRepo
      .createQueryBuilder()
      .update(TenGrandTurn)
      .set({ Score })
      .where('id = :id', { id })
      .execute();
  }

  async updateTenGrandScore(id: number) {
    let Score = 0;
    const turns = await this.tenGrandTurnRepo.find({
      where: { ten_grand_id: id },
    });
    for (const turn of turns) {
      Score += turn.Score || 0;
    }
    await this.tenGrandRepo
      .createQueryBuilder()
      .update(TenGrand)
      .set({ Score })
      .where('id = :id', { id })
      .execute();
  }

  async getTenGrandTurnById(id: number) {
    return await this.tenGrandTurnRepo.findOne({
      where: { id },
      relations: ['scores'],
    });
  }
}
