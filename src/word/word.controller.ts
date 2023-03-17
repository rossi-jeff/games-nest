import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RandomWordDto } from '../global/dto/random-word.dto';
import { ResponseWordDto } from '../global/response/response-word.dto';
import { WordService } from './word.service';

@ApiTags('Word')
@Controller('word')
export class WordController {
  constructor(private wordService: WordService) {}

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'word',
    type: ResponseWordDto,
  })
  async findById(@Param('id') id: string) {
    return await this.wordService.findById(parseInt(id));
  }

  @Post('random')
  @ApiResponse({
    status: 200,
    description: 'word',
    type: ResponseWordDto,
  })
  async randomWord(@Body() dto: RandomWordDto) {
    return await this.wordService.randomWord(dto);
  }
}
