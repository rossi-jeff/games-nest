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
import { UpdateKlondikeDto } from '../global/dto/update-klondike.dto';
import { OptionalAuthGuard } from '../global/optional-auth-guard';
import { KlondikeService } from './klondike.service';

@Controller('klondike')
export class KlondikeController {
  constructor(private klondikeService: KlondikeService) {}

  @Get()
  async paginatedKlondikes(
    @Query() query: { Limit?: string; Offset?: string },
  ) {
    return await this.klondikeService.paginatedKlondikes(query);
  }

  @Get(':id')
  async getKlondikeById(@Param('id') id: string) {
    return await this.klondikeService.getKlondikeById(parseInt(id));
  }

  @Post()
  @UseGuards(OptionalAuthGuard)
  async createKlondike(@Req() req: any) {
    return await this.klondikeService.createKlondike(req.user.id);
  }

  @Patch(':id')
  async updateKlondike(
    @Body() dto: UpdateKlondikeDto,
    @Param('id') id: string,
  ) {
    return await this.klondikeService.updateKlondike(dto, parseInt(id));
  }
}
