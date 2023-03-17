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
import { PaginatedQueryDto } from '../global/dto/paginated-query.dto';
import { YachtRollDto } from '../global/dto/yachr-roll.dto';
import { YachtScoreDto } from '../global/dto/yacht-score-dto';
import { OptionalAuthGuard } from '../global/optional-auth-guard';
import { ResponsePaginatedYachtDto } from '../global/response/response-paginated-yacht.dto';
import { ResponseYachtRollDto } from '../global/response/response-yacht-roll.dto';
import { ResponseYachtTurnDto } from '../global/response/response-yacht-turn.dto';
import { ResponseYachtDto } from '../global/response/response-yacht.dto';
import { YachtService } from './yacht.service';

@ApiTags('Yacht')
@Controller('yacht')
export class YachtController {
  constructor(private yachtService: YachtService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'paginated list of yachts',
    type: ResponsePaginatedYachtDto,
  })
  @ApiQuery({ type: PaginatedQueryDto })
  async paginatedYachts(@Query() query: { Limit?: string; Offset?: string }) {
    return await this.yachtService.paginatedYachts(query);
  }

  @Get('progress')
  @UseGuards(OptionalAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'list if in progress yachts',
    type: [ResponseYachtDto],
  })
  async inProgressYachts(@Req() req: any) {
    return await this.yachtService.inProgressYachts(req.user.id);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'yacht',
    type: ResponseYachtDto,
  })
  async getYachtById(@Param('id') id: string) {
    return await this.yachtService.getYachtById(parseInt(id));
  }

  @Post()
  @UseGuards(OptionalAuthGuard)
  @ApiResponse({
    status: 201,
    description: 'yacht',
    type: ResponseYachtDto,
  })
  async createYacht(@Req() req: any) {
    return await this.yachtService.createYacht(req.user.id);
  }

  @Post(':id/roll')
  @ApiResponse({
    status: 200,
    description: 'yacht roll',
    type: ResponseYachtRollDto,
  })
  async yachtRoll(@Body() dto: YachtRollDto, @Param('id') id: string) {
    return await this.yachtService.yachtRoll(dto, parseInt(id));
  }

  @Post(':id/score')
  @ApiResponse({
    status: 201,
    description: 'yacht turn',
    type: ResponseYachtTurnDto,
  })
  async yachtScore(@Body() dto: YachtScoreDto, @Param('id') id: string) {
    return await this.yachtService.yachtScore(dto, parseInt(id));
  }
}
