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
import { SpiderService } from './spider.service';
import { UpdateSpiderDto } from '../global/dto/update-spider.dto';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { responsePaginatedSpiderDto } from '../global/response/response-paginated-spider.dto';
import { PaginatedQueryDto } from '../global/dto/paginated-query.dto';
import { ResponseSpiderDto } from '../global/response/response-spider.dto';
import { OptionalAuthGuard } from '../global/optional-auth-guard';
import { CreateSpiderDto } from '../global/dto/create-spider.dto';

@ApiTags('Spider')
@Controller('spider')
export class SpiderController {
  constructor(private spiderService: SpiderService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'paginated list of spiders',
    type: responsePaginatedSpiderDto,
  })
  @ApiQuery({ type: PaginatedQueryDto })
  async paginatedSpiders(@Query() query: { Limit?: string; Offset?: string }) {
    return await this.spiderService.paginatedSpiders(query);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'spider',
    type: ResponseSpiderDto,
  })
  async getSpiderById(@Param('id') id: string) {
    return await this.spiderService.getSpiderById(parseInt(id));
  }

  @Post()
  @UseGuards(OptionalAuthGuard)
  @ApiResponse({
    status: 201,
    description: 'spider',
    type: ResponseSpiderDto,
  })
  async createSpider(@Body() dto: CreateSpiderDto, @Req() req: any) {
    return await this.spiderService.createSpider(dto, req.user.id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'spider',
    type: ResponseSpiderDto,
  })
  async updateSpider(@Body() dto: UpdateSpiderDto, @Param('id') id: string) {
    return await this.spiderService.updateSpider(dto, parseInt(id));
  }
}
