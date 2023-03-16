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
import { TenGrandOptionsDto } from '../global/dto/ten-grand-options.dto';
import { TenGrandRollDto } from '../global/dto/ten-grand-roll.dto';
import { TenGrandScoreDto } from '../global/dto/ten-grand-score.dto';
import { OptionalAuthGuard } from '../global/optional-auth-guard';
import { TenGrandService } from './ten-grand.service';

@Controller('ten_grand')
export class TenGrandController {
  constructor(private tenGrandService: TenGrandService) {}

  @Get()
  async paginatedTenGrands(
    @Query() query: { Limit?: string; Offset?: string },
  ) {
    return await this.tenGrandService.paginatedTenGrands(query);
  }

  @Get('progress')
  @UseGuards(OptionalAuthGuard)
  async inProgressTenGrands(@Req() req: any) {
    return await this.tenGrandService.inProgressTenGrands(req.user.id);
  }

  @Get(':id')
  async getTenGrandById(@Param('id') id: string) {
    return await this.tenGrandService.getTenGrandById(parseInt(id));
  }

  @Post()
  @UseGuards(OptionalAuthGuard)
  async createTenGrand(@Req() req: any) {
    return await this.tenGrandService.createTenGrand(req.user.id);
  }

  @Post(':id/roll')
  async tenGrandRoll(@Body() dto: TenGrandRollDto) {
    return await this.tenGrandService.tenGrandRoll(dto);
  }

  @Post('options')
  async tenGrandOptions(@Body() dto: TenGrandOptionsDto) {
    return await this.tenGrandService.tenGrandOptions(dto);
  }

  @Post(':id/score')
  async tenGrandScore(@Body() dto: TenGrandScoreDto, @Param('id') id: string) {
    return await this.tenGrandService.tenGrandScore(dto, parseInt(id));
  }
}
