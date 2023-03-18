import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThanOrEqual, LessThan, Not } from 'typeorm';
import { Yacht } from './yacht.entity';
import { YachtTurn } from './yacht-turn.entity';
import { defaultLimit, defaultOffset } from '../global/constants';
import { YachtRollDto } from '../global/dto/yachr-roll.dto';
import { YachtScoreDto } from '../global/dto/yacht-score-dto';
import { YachtCategoryArray } from '../global/enum/yacht-category.enum';
import { buildScoreOptions, categoryScore } from './yacht-functions';

@Injectable()
export class YachtService {
  constructor(
    @InjectRepository(Yacht) private yachtRepo: Repository<Yacht>,
    @InjectRepository(YachtTurn) private yachtTurnRepo: Repository<YachtTurn>,
  ) {}

  async paginatedYachts(query: { Limit?: string; Offset?: string }) {
    const { Limit, Offset } = query;
    const take = Limit ? parseInt(Limit) : defaultLimit;
    const skip = Offset ? parseInt(Offset) : defaultOffset;
    const where = { NumTurns: MoreThanOrEqual(12) };
    const Items = await this.yachtRepo.find({
      where,
      order: { Total: 'DESC' },
      skip,
      take,
      relations: ['user'],
    });
    const Count = await this.yachtRepo.count({ where });
    return { Items, Count, Limit: take, Offset: skip };
  }

  async inProgressYachts(user_id?: number) {
    if (user_id) {
      return await this.yachtRepo.find({
        where: {
          user_id,
          NumTurns: LessThan(12),
        },
        relations: ['turns'],
      });
    } else return [];
  }

  async getYachtById(id: number) {
    return await this.yachtRepo.findOne({
      where: { id },
      relations: ['user', 'turns'],
    });
  }

  async createYacht(user_id?: number) {
    const yacht = new Yacht();
    const now = new Date().toISOString();
    yacht.user_id = user_id || null;
    yacht.created_at = now;
    yacht.updated_at = now;
    const saved = await this.yachtRepo.save(yacht);
    return await this.getYachtById(saved.id);
  }

  async yachtRoll(dto: YachtRollDto, id: number) {
    const { Keep } = dto;
    const Dice: number[] = [...Keep];
    while (Dice.length < 5) Dice.push(Math.ceil(Math.random() * 6));
    let Turn: YachtTurn;
    const now = new Date().toISOString();
    const lastTurn = await this.yachtTurnRepo.findOne({
      where: {
        yacht_id: id,
        Category: null,
      },
      order: {
        id: 'DESC',
      },
    });
    if (lastTurn && lastTurn.RollThree == '') {
      if (lastTurn.RollTwo != '') {
        await this.yachtTurnRepo
          .createQueryBuilder()
          .update(YachtTurn)
          .set({ RollThree: Dice.join(',') })
          .where('id = :id', { id: lastTurn.id })
          .execute();
      } else {
        await this.yachtTurnRepo
          .createQueryBuilder()
          .update(YachtTurn)
          .set({ RollTwo: Dice.join(',') })
          .where('id = :id', { id: lastTurn.id })
          .execute();
      }
      Turn = await this.yachtTurnRepo.findOne({ where: { id: lastTurn.id } });
    } else {
      const turn = new YachtTurn();
      turn.yacht_id = id;
      turn.RollOne = Dice.join(',');
      turn.RollTwo = '';
      turn.RollThree = '';
      turn.created_at = now;
      turn.updated_at = now;
      Turn = await this.yachtTurnRepo.save(turn);
    }
    const skip = await this.categorySkip(id);
    const Options = buildScoreOptions(Dice, skip);
    return { Turn, Options };
  }

  async yachtScore(dto: YachtScoreDto, id: number) {
    const { TurnId, Category } = dto;
    const turn = await this.yachtTurnRepo.findOne({ where: { id: TurnId } });
    if (!turn) return null;
    let dice: number[] = [];
    if (turn.RollThree != '') {
      dice = turn.RollThree.split(',').map((d) => parseInt(d));
    } else if (turn.RollTwo != '') {
      dice = turn.RollTwo.split(',').map((d) => parseInt(d));
    } else {
      dice = turn.RollOne.split(',').map((d) => parseInt(d));
    }
    const Score = categoryScore(Category.toString(), dice);
    await this.yachtTurnRepo
      .createQueryBuilder()
      .update(YachtTurn)
      .set({ Score, Category: YachtCategoryArray.indexOf(Category.toString()) })
      .where('id = :id', { id: TurnId })
      .execute();
    await this.updateYachtTotal(id);
    return await this.yachtTurnRepo.findOne({ where: { id: TurnId } });
  }

  async updateYachtTotal(id: number) {
    const turns = await this.yachtTurnRepo.find({ where: { yacht_id: id } });
    let Total = 0;
    for (const turn of turns) {
      Total += turn.Score || 0;
    }
    await this.yachtRepo
      .createQueryBuilder()
      .update(Yacht)
      .set({ Total, NumTurns: turns.length })
      .where('id = :id', { id })
      .execute();
  }

  async categorySkip(id: number) {
    const skip: string[] = [];
    const turns = await this.yachtTurnRepo.find({
      where: {
        yacht_id: id,
      },
    });
    for (const turn of turns) {
      const category = YachtCategoryArray[turn.Category];
      if (category) skip.push(category);
    }
    return skip;
  }
}
