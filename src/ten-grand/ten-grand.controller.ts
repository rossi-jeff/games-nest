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
import { TenGrandOptionsDto } from '../global/dto/ten-grand-options.dto';
import { TenGrandRollDto } from '../global/dto/ten-grand-roll.dto';
import { TenGrandScoreDto } from '../global/dto/ten-grand-score.dto';
import { OptionalAuthGuard } from '../global/optional-auth-guard';
import { ResponsePaginatedTenGrandDto } from '../global/response/response-paginated-ten-grand.dto';
import { ResponseTenGrandOptionsDto } from '../global/response/response-ten-grand-option.dto';
import { ResponseTenGrandTurnDto } from '../global/response/response-ten-grand-turn.dto';
import { ResponseTenGrandDto } from '../global/response/response-ten-grand.dto';
import { TenGrandService } from './ten-grand.service';

@ApiTags('Ten Grand')
@Controller('ten_grand')
export class TenGrandController {
  constructor(private tenGrandService: TenGrandService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'paginated list of ten grands',
    type: ResponsePaginatedTenGrandDto,
  })
  @ApiQuery({ type: PaginatedQueryDto })
  async paginatedTenGrands(
    @Query() query: { Limit?: string; Offset?: string },
  ) {
    return await this.tenGrandService.paginatedTenGrands(query);
  }

  @Get('progress')
  @UseGuards(OptionalAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'list of in progress ten grands',
    type: [ResponseTenGrandDto],
  })
  async inProgressTenGrands(@Req() req: any) {
    return await this.tenGrandService.inProgressTenGrands(req.user.id);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'ten grand',
    type: ResponseTenGrandDto,
  })
  async getTenGrandById(@Param('id') id: string) {
    return await this.tenGrandService.getTenGrandById(parseInt(id));
  }

  @Post()
  @UseGuards(OptionalAuthGuard)
  @ApiResponse({
    status: 201,
    description: 'ten grand',
    type: ResponseTenGrandDto,
  })
  async createTenGrand(@Req() req: any) {
    return await this.tenGrandService.createTenGrand(req.user.id);
  }

  @Post(':id/roll')
  @ApiResponse({
    status: 200,
    description: 'array of dice',
    type: [Number],
  })
  async tenGrandRoll(@Body() dto: TenGrandRollDto) {
    return await this.tenGrandService.tenGrandRoll(dto);
  }

  @Post('options')
  @ApiResponse({
    status: 200,
    description: 'scoring options for dice',
    type: ResponseTenGrandOptionsDto,
  })
  async tenGrandOptions(@Body() dto: TenGrandOptionsDto) {
    return await this.tenGrandService.tenGrandOptions(dto);
  }

  @Post(':id/score')
  @ApiResponse({
    status: 201,
    description: 'ten grand turn',
    type: ResponseTenGrandTurnDto,
  })
  async tenGrandScore(@Body() dto: TenGrandScoreDto, @Param('id') id: string) {
    return await this.tenGrandService.tenGrandScore(dto, parseInt(id));
  }
}
