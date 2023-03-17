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
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GuessWordGuessDto } from '../global/dto/guess-word-guess.dto';
import { GuessWordHintDto } from '../global/dto/guess-word-hint.dto';
import { PaginatedQueryDto } from '../global/dto/paginated-query.dto';
import { WordIdDto } from '../global/dto/word-id.dto';
import { OptionalAuthGuard } from '../global/optional-auth-guard';
import { ResponseGuessWordGuessDto } from '../global/response/response-guess-word-guess.dto';
import { ResponseGuessWordDto } from '../global/response/response-guess-word.dto';
import { ResponsePaginatedGuessWordDto } from '../global/response/response-paginated-guess-word.dto';
import { GuessWordService } from './guess-word.service';

@ApiTags('Guess Word')
@Controller('guess_word')
export class GuessWordController {
  constructor(private guessWordService: GuessWordService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'paginated list of guess words',
    type: ResponsePaginatedGuessWordDto,
  })
  @ApiQuery({ type: PaginatedQueryDto })
  async paginatedGuessWords(
    @Query() query: { Limit?: string; Offset?: string },
  ) {
    return await this.guessWordService.paginatedGuessWords(query);
  }

  @Get('progress')
  @UseGuards(OptionalAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'list of in progress guess words',
    type: [ResponseGuessWordDto],
  })
  async inProgressGuessWords(@Req() req: any) {
    return await this.guessWordService.inProgressGuessWords(req.user.id);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'guess word',
    type: ResponseGuessWordDto,
  })
  async getGuessWordById(@Param('id') id: string) {
    return await this.guessWordService.getGuessWordById(parseInt(id));
  }

  @Post()
  @UseGuards(OptionalAuthGuard)
  @ApiResponse({
    status: 201,
    description: 'guess word',
    type: ResponseGuessWordDto,
  })
  async createGuessWord(@Body() dto: WordIdDto, @Req() req: any) {
    return await this.guessWordService.createGuessWord(dto, req.user.id);
  }

  @Post(':id/guess')
  @ApiResponse({
    status: 201,
    description: 'guess word guess',
    type: ResponseGuessWordGuessDto,
  })
  async guessWordGuess(
    @Body() dto: GuessWordGuessDto,
    @Param('id') id: string,
  ) {
    return await this.guessWordService.guessWordGuess(dto, parseInt(id));
  }

  @Post('hint')
  @ApiResponse({
    status: 200,
    description: 'list of word hints',
    type: [String],
  })
  async guessWordHints(@Body() dto: GuessWordHintDto) {
    return await this.guessWordService.guessWordHints(dto);
  }
}
