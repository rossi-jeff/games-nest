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
import { PokerSquareService } from './poker-square.service';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginatedQueryDto } from 'src/global/dto/paginated-query.dto';
import { OptionalAuthGuard } from 'src/global/optional-auth-guard';
import { UpdatePokerSquareDto } from 'src/global/dto/update-poker-square.dto';
import { ResponsePokerSquareDto } from 'src/global/response/response-poker-square.dro';
import { ResponsePaginatedPokerSquare } from 'src/global/response/response-paginated-poker-square.dto';

@ApiTags('Poker Square')
@Controller('poker_square')
export class PokerSquareController {
  constructor(private pokerSquareService: PokerSquareService) {}

  @Get()
  @ApiQuery({ type: PaginatedQueryDto })
  @ApiResponse({
    status: 200,
    description: 'paginated list of poker squares',
    type: ResponsePaginatedPokerSquare,
  })
  async paginatedPokerSquares(
    @Query() query: { Limit?: string; Offset?: string },
  ) {
    return this.pokerSquareService.paginatedPokerSquares(query);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'poker square',
    type: ResponsePokerSquareDto,
  })
  async getPokerSquareById(@Param('id') id: string) {
    return this.pokerSquareService.getPokerSquareById(parseInt(id));
  }

  @Post()
  @UseGuards(OptionalAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'poker square',
    type: ResponsePokerSquareDto,
  })
  async createPokerSquare(@Req() req: any) {
    return this.pokerSquareService.createPokerSquare(req.user.id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'poker square',
    type: ResponsePokerSquareDto,
  })
  async updatePokerSquare(
    @Body() dto: UpdatePokerSquareDto,
    @Param('id') id: string,
  ) {
    return this.pokerSquareService.updatePokerSquare(dto, parseInt(id));
  }
}
