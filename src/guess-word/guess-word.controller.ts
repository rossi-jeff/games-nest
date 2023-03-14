import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { GuessWordGuessDto } from '../global/dto/guess-word-guess.dto';
import { GuessWordHintDto } from '../global/dto/guess-word-hint.dto';
import { WordIdDto } from '../global/dto/word-id.dto';
import { OptionalAuthGuard } from '../global/optional-auth-guard';
import { GuessWordService } from './guess-word.service';

@Controller('guess_word')
export class GuessWordController {
  constructor(private guessWordService: GuessWordService) {}

  @Get()
  async paginatedGuessWords(
    @Query() query: { Limit?: string; Offset?: string },
  ) {
    return await this.guessWordService.paginatedGuessWords(query);
  }

  @Get('progress')
  @UseGuards(OptionalAuthGuard)
  async inProgressGuessWords(@Req() req: any) {
    return await this.guessWordService.inProgressGuessWords(req.user.id);
  }

  @Get(':id')
  async getGuessWordById(@Param('id') id: string) {
    return await this.guessWordService.getGuessWordById(parseInt(id));
  }

  @Post()
  @UseGuards(OptionalAuthGuard)
  async createGuessWord(@Body() dto: WordIdDto, @Req() req: any) {
    return await this.guessWordService.createGuessWord(dto, req.user.id);
  }

  @Post(':id/guess')
  async guessWordGuess(
    @Body() dto: GuessWordGuessDto,
    @Param('id') id: string,
  ) {
    return await this.guessWordService.guessWordGuess(dto, parseInt(id));
  }

  @Post('hint')
  async guessWordHints(@Body() dto: GuessWordHintDto) {
    return await this.guessWordService.guessWordHints(dto);
  }
}
