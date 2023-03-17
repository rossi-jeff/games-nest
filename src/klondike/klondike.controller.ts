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
import { UpdateKlondikeDto } from '../global/dto/update-klondike.dto';
import { OptionalAuthGuard } from '../global/optional-auth-guard';
import { ResponseKlondikeDto } from '../global/response/response-klondike.dto';
import { ResponsePaginatedKlondikeDto } from '../global/response/response-paginated-klondike.dto';
import { KlondikeService } from './klondike.service';

@ApiTags('Klondike')
@Controller('klondike')
export class KlondikeController {
  constructor(private klondikeService: KlondikeService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'paginated list of klondikes',
    type: ResponsePaginatedKlondikeDto,
  })
  @ApiQuery({ type: PaginatedQueryDto })
  async paginatedKlondikes(
    @Query() query: { Limit?: string; Offset?: string },
  ) {
    return await this.klondikeService.paginatedKlondikes(query);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'klondike',
    type: ResponseKlondikeDto,
  })
  async getKlondikeById(@Param('id') id: string) {
    return await this.klondikeService.getKlondikeById(parseInt(id));
  }

  @Post()
  @UseGuards(OptionalAuthGuard)
  @ApiResponse({
    status: 201,
    description: 'klondike',
    type: ResponseKlondikeDto,
  })
  async createKlondike(@Req() req: any) {
    return await this.klondikeService.createKlondike(req.user.id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'klondike',
    type: ResponseKlondikeDto,
  })
  async updateKlondike(
    @Body() dto: UpdateKlondikeDto,
    @Param('id') id: string,
  ) {
    return await this.klondikeService.updateKlondike(dto, parseInt(id));
  }
}
