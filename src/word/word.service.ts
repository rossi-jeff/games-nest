import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { RandomWordDto } from '../global/dto/random-word.dto';
import { Word } from './word.entity';

@Injectable()
export class WordService {
  constructor(@InjectRepository(Word) private wordRepo: Repository<Word>) {}

  async findById(id: number) {
    return await this.wordRepo.findOne({ where: { id } });
  }

  async randomWord(dto: RandomWordDto) {
    const { Length, Min, Max } = dto;
    let where = {};
    if (Length) {
      where = { Length };
    } else if (Min && Max) {
      where = { Length: Between(Min, Max) };
    } else if (Min) {
      where = { Length: MoreThanOrEqual(Min) };
    } else if (Max) {
      where = { Length: LessThanOrEqual(Max) };
    }
    const count = await this.wordRepo.count({ where });
    const skip = Math.floor(Math.random() * count);
    const result = await this.wordRepo.find({
      where,
      order: { Word: 'ASC' },
      skip,
      take: 1,
    });
    return result[0];
  }
}
