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
import { HangManGuessDto } from '../global/dto/hang-man-guess.dto';
import { WordIdDto } from '../global/dto/word-id.dto';
import { OptionalAuthGuard } from '../global/optional-auth-guard';
import { HangManService } from './hang-man.service';

@Controller('hang_man')
export class HangManController {
  constructor(private hangManService: HangManService) {}

  @Get()
  async paginatedHangMen(@Query() query: { Limit?: string; Offset?: string }) {
    return await this.hangManService.paginatedHangMen(query);
  }

  @Get('progress')
  @UseGuards(OptionalAuthGuard)
  async inProgressHangMen(@Req() req: any) {
    return await this.hangManService.inProgressHangMen(req.user.id);
  }

  @Get(':id')
  async getHangManById(@Param('id') id: string) {
    return await this.hangManService.getHangManById(parseInt(id));
  }

  @Post()
  @UseGuards(OptionalAuthGuard)
  async createHangMan(@Body() dto: WordIdDto, @Req() req: any) {
    return await this.hangManService.createHangMan(dto, req.user.id);
  }

  @Post(':id/guess')
  async hangManGuess(@Body() dto: HangManGuessDto, @Param('id') id: string) {
    return await this.hangManService.hangManGuess(dto, parseInt(id));
  }
}
