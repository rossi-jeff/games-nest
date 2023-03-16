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
import { YachtRollDto } from '../global/dto/yachr-roll.dto';
import { YachtScoreDto } from '../global/dto/yacht-score-dto';
import { OptionalAuthGuard } from '../global/optional-auth-guard';
import { YachtService } from './yacht.service';

@Controller('yacht')
export class YachtController {
  constructor(private yachtService: YachtService) {}

  @Get()
  async paginatedYachts(@Query() query: { Limit?: string; Offset?: string }) {
    return await this.yachtService.paginatedYachts(query);
  }

  @Get('progress')
  @UseGuards(OptionalAuthGuard)
  async inProgressYachts(@Req() req: any) {
    return await this.yachtService.inProgressYachts(req.user.id);
  }

  @Get(':id')
  async getYachtById(@Param('id') id: string) {
    return await this.yachtService.getYachtById(parseInt(id));
  }

  @Post()
  @UseGuards(OptionalAuthGuard)
  async createYacht(@Req() req: any) {
    return await this.yachtService.createYacht(req.user.id);
  }

  @Post(':id/roll')
  async yachtRoll(@Body() dto: YachtRollDto, @Param('id') id: string) {
    return await this.yachtService.yachtRoll(dto, parseInt(id));
  }

  @Post(':id/score')
  async yachtScore(@Body() dto: YachtScoreDto, @Param('id') id: string) {
    return await this.yachtService.yachtScore(dto, parseInt(id));
  }
}
