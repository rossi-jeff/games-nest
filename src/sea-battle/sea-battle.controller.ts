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
import { CreateSeaBattleDto } from '../global/dto/create-sea-battle.dto';
import { PaginatedQueryDto } from '../global/dto/paginated-query.dto';
import { SeaBattleFireDto } from '../global/dto/sea-battle-fire.dto';
import { SeaBattleShipDto } from '../global/dto/sea-battle-ship.dto';
import { OptionalAuthGuard } from '../global/optional-auth-guard';
import { ResponsePaginatedSeBattleDto } from '../global/response/response-paginated-sea-battle.dto';
import { ResponseSeabattleShipDto } from '../global/response/response-sea-battle-ship.dto';
import { ResponseSeaBattleTurnDto } from '../global/response/response-sea-battle-turn.dto';
import { ResponseSeaBattleDto } from '../global/response/response-sea-battle.dto';
import { SeaBattleService } from './sea-battle.service';

@ApiTags('Sea Battle')
@Controller('sea_battle')
export class SeaBattleController {
  constructor(private seaBattleService: SeaBattleService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'paginated list of sea battles',
    type: ResponsePaginatedSeBattleDto,
  })
  @ApiQuery({ type: PaginatedQueryDto })
  async paginatedSeaBattles(
    @Query() query: { Limit?: string; Offset?: string },
  ) {
    return await this.seaBattleService.paginatedSeaBattles(query);
  }

  @Get('progress')
  @UseGuards(OptionalAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'list of in progress sea battles',
    type: [ResponseSeaBattleDto],
  })
  async inProgressSeaBattles(@Req() req: any) {
    return await this.seaBattleService.inProgressSeaBattles(req.user.id);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'sea battle',
    type: ResponseSeaBattleDto,
  })
  async getSeaBattleById(@Param('id') id: string) {
    return await this.seaBattleService.getSeaBattleById(parseInt(id));
  }

  @Post()
  @UseGuards(OptionalAuthGuard)
  @ApiResponse({
    status: 201,
    description: 'sea battle',
    type: ResponseSeaBattleDto,
  })
  async createSeaBattle(@Body() dto: CreateSeaBattleDto, @Req() req: any) {
    return await this.seaBattleService.createSeaBattle(dto, req.user.id);
  }

  @Post(':id/ship')
  @ApiResponse({
    status: 201,
    description: 'sea battle ship',
    type: ResponseSeabattleShipDto,
  })
  async seaBattleShip(@Body() dto: SeaBattleShipDto, @Param('id') id: string) {
    return await this.seaBattleService.seaBattleShip(dto, parseInt(id));
  }

  @Post(':id/fire')
  @ApiResponse({
    status: 201,
    description: 'sea battle turn',
    type: ResponseSeaBattleTurnDto,
  })
  async seaBattleFire(@Body() dto: SeaBattleFireDto, @Param('id') id: string) {
    return await this.seaBattleService.seaBattleFire(dto, parseInt(id));
  }
}
