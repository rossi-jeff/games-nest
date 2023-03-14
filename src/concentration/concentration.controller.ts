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
import { UpdateConcentrationDto } from '../global/dto/update-concentration.dto';
import { OptionalAuthGuard } from '../global/optional-auth-guard';
import { ConcentrationService } from './concentration.service';

@Controller('concentration')
export class ConcentrationController {
  constructor(private concentrationService: ConcentrationService) {}

  @Get()
  async paginatedConcentrations(
    @Query() query: { Limit?: string; Offset?: string },
  ) {
    return await this.concentrationService.paginatedConcentrations(query);
  }

  @Get(':id')
  async getConcenrationById(@Param('id') id: string) {
    return await this.concentrationService.getConcenrationById(parseInt(id));
  }

  @Post()
  @UseGuards(OptionalAuthGuard)
  async createConcentration(@Req() req: any) {
    return await this.concentrationService.createConcentration(req.user.id);
  }

  @Patch(':id')
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
