import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RandomWordDto } from '../global/dto/random-word.dto';
import { WordService } from './word.service';

@Controller('word')
export class WordController {
  constructor(private wordService: WordService) {}

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.wordService.findById(parseInt(id));
  }

  @Post('random')
  async randomWord(@Body() dto: RandomWordDto) {
    return await this.wordService.randomWord(dto);
  }
}
