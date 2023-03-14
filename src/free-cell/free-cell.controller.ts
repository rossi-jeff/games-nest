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
import { UpdateFreeCellDto } from '../global/dto/update-free-cell.dto';
import { OptionalAuthGuard } from '../global/optional-auth-guard';
import { FreeCellService } from './free-cell.service';

@Controller('free_cell')
export class FreeCellController {
  constructor(private freeCellService: FreeCellService) {}

  @Get()
  async paginatedFreeCells(
    @Query() query: { Limit?: string; Offset?: string },
  ) {
    return await this.freeCellService.paginatedFreeCells(query);
  }

  @Get(':id')
  async getFreecellById(@Param('id') id: string) {
    return await this.freeCellService.getFreecellById(parseInt(id));
  }

  @Post()
  @UseGuards(OptionalAuthGuard)
  async createFreeCell(@Req() req: any) {
    return await this.freeCellService.createFreeCell(req.user.id);
  }

  @Patch(':id')
  async updateFreeCell(
    @Param('id') id: string,
    @Body() dto: UpdateFreeCellDto,
  ) {
    return await this.freeCellService.updateFreeCell(parseInt(id), dto);
  }
}
