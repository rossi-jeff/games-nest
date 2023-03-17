import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginatedQueryDto } from '../global/dto/paginated-query.dto';
import { UpdateFreeCellDto } from '../global/dto/update-free-cell.dto';
import { OptionalAuthGuard } from '../global/optional-auth-guard';
import { ResponseFreeCellDto } from '../global/response/response-free-cell.dto';
import { ResponsePaginatedFreeCellDto } from '../global/response/response-paginated-free-cell.dto';
import { FreeCellService } from './free-cell.service';

@ApiTags('Free Cell')
@Controller('free_cell')
export class FreeCellController {
  constructor(private freeCellService: FreeCellService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'paginated list of free cell',
    type: ResponsePaginatedFreeCellDto,
  })
  @ApiQuery({ type: PaginatedQueryDto })
  async paginatedFreeCells(
    @Query() query: { Limit?: string; Offset?: string },
  ) {
    return await this.freeCellService.paginatedFreeCells(query);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'free cell',
    type: ResponseFreeCellDto,
  })
  async getFreecellById(@Param('id') id: string) {
    return await this.freeCellService.getFreecellById(parseInt(id));
  }

  @Post()
  @UseGuards(OptionalAuthGuard)
  @ApiResponse({
    status: 201,
    description: 'free cell',
    type: ResponseFreeCellDto,
  })
  async createFreeCell(@Req() req: any) {
    return await this.freeCellService.createFreeCell(req.user.id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'free cell',
    type: ResponseFreeCellDto,
  })
  async updateFreeCell(
    @Param('id') id: string,
    @Body() dto: UpdateFreeCellDto,
  ) {
    return await this.freeCellService.updateFreeCell(parseInt(id), dto);
  }
}
