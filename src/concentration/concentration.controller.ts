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
import { UpdateConcentrationDto } from '../global/dto/update-concentration.dto';
import { OptionalAuthGuard } from '../global/optional-auth-guard';
import { ResponseConcentrationDto } from '../global/response/response-concentration.dto';
import { ResponsePaginatedConcentrationDto } from '../global/response/response-paginated-concentration.dto';
import { ConcentrationService } from './concentration.service';

@ApiTags('Concentration')
@Controller('concentration')
export class ConcentrationController {
  constructor(private concentrationService: ConcentrationService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'paginated list of concentration',
    type: ResponsePaginatedConcentrationDto,
  })
  @ApiQuery({ type: PaginatedQueryDto })
  async paginatedConcentrations(
    @Query() query: { Limit?: string; Offset?: string },
  ) {
    return await this.concentrationService.paginatedConcentrations(query);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'concentration',
    type: ResponseConcentrationDto,
  })
  async getConcenrationById(@Param('id') id: string) {
    return await this.concentrationService.getConcenrationById(parseInt(id));
  }

  @Post()
  @UseGuards(OptionalAuthGuard)
  @ApiResponse({
    status: 201,
    description: 'concentration',
    type: ResponseConcentrationDto,
  })
  async createConcentration(@Req() req: any) {
    return await this.concentrationService.createConcentration(req.user.id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'concentration',
    type: ResponseConcentrationDto,
  })
  async updateConcentration(
    @Param('id') id: string,
    @Body() dto: UpdateConcentrationDto,
  ) {
    return await this.concentrationService.updateConcentration(
      parseInt(id),
      dto,
    );
  }
}
