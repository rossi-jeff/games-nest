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
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginatedQueryDto } from '../global/dto/paginated-query.dto';
import { ResponsePaginatedHangManDto } from '../global/response/response-paginated-hang-man.dto';
import { ResponseHangManDto } from '../global/response/response-hang-man.dto';

@ApiTags('Hang Man')
@Controller('hang_man')
export class HangManController {
  constructor(private hangManService: HangManService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'paginated list of hang men',
    type: ResponsePaginatedHangManDto,
  })
  @ApiQuery({ type: PaginatedQueryDto })
  async paginatedHangMen(@Query() query: { Limit?: string; Offset?: string }) {
    return await this.hangManService.paginatedHangMen(query);
  }

  @Get('progress')
  @UseGuards(OptionalAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'list of in progress hang men',
    type: [ResponseHangManDto],
  })
  async inProgressHangMen(@Req() req: any) {
    return await this.hangManService.inProgressHangMen(req.user.id);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'hang man',
    type: ResponseHangManDto,
  })
  async getHangManById(@Param('id') id: string) {
    return await this.hangManService.getHangManById(parseInt(id));
  }

  @Post()
  @UseGuards(OptionalAuthGuard)
  @ApiResponse({
    status: 201,
    description: 'hang man',
    type: ResponseHangManDto,
  })
  async createHangMan(@Body() dto: WordIdDto, @Req() req: any) {
    return await this.hangManService.createHangMan(dto, req.user.id);
  }

  @Post(':id/guess')
  @ApiResponse({
    status: 200,
    description: 'hang man',
    type: ResponseHangManDto,
  })
  async hangManGuess(@Body() dto: HangManGuessDto, @Param('id') id: string) {
    return await this.hangManService.hangManGuess(dto, parseInt(id));
  }
}
