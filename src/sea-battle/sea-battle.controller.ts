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
import { CreateSeaBattleDto } from '../global/dto/create-sea-battle.dto';
import { SeaBattleFireDto } from '../global/dto/sea-battle-fire.dto';
import { SeaBattleShipDto } from '../global/dto/sea-battle-ship.dto';
import { OptionalAuthGuard } from '../global/optional-auth-guard';
import { SeaBattleService } from './sea-battle.service';

@Controller('sea_battle')
export class SeaBattleController {
  constructor(private seaBattleService: SeaBattleService) {}

  @Get()
  async paginatedSeaBattles(
    @Query() query: { Limit?: string; Offset?: string },
  ) {
    return await this.seaBattleService.paginatedSeaBattles(query);
  }

  @Get('progress')
  @UseGuards(OptionalAuthGuard)
  async inProgressSeaBattles(@Req() req: any) {
    return await this.seaBattleService.inProgressSeaBattles(req.user.id);
  }

  @Get(':id')
  async getSeaBattleById(@Param('id') id: string) {
    return await this.seaBattleService.getSeaBattleById(parseInt(id));
  }

  @Post()
  @UseGuards(OptionalAuthGuard)
  async createSeaBattle(@Body() dto: CreateSeaBattleDto, @Req() req: any) {
    return await this.seaBattleService.createSeaBattle(dto, req.user.id);
  }

  @Post(':id/ship')
  async seaBattleShip(@Body() dto: SeaBattleShipDto, @Param('id') id: string) {
    return await this.seaBattleService.seaBattleShip(dto, parseInt(id));
  }

  @Post(':id/fire')
  async seaBattleFire(@Body() dto: SeaBattleFireDto, @Param('id') id: string) {
    return await this.seaBattleService.seaBattleFire(dto, parseInt(id));
  }
}
