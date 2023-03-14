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
import { CodeBreakerGuessDto } from '../global/dto/code-breaker-guess.dto';
import { CreateCodeBreakerDto } from '../global/dto/create-code-breaker.dto';
import { OptionalAuthGuard } from '../global/optional-auth-guard';
import { CodeBreakerService } from './code-breaker.service';

@Controller('code_breaker')
export class CodeBreakerController {
  constructor(private codeBreakerService: CodeBreakerService) {}

  @Get()
  async paginatedCodeBreakers(
    @Query() query: { Limit?: string; Offset?: string },
  ) {
    return await this.codeBreakerService.paginatedCodeBreakers(query);
  }

  @Get('progress')
  @UseGuards(OptionalAuthGuard)
  async inProgressCodeBreakers(@Req() req: any) {
    return await this.codeBreakerService.inProgressCodeBreakers(req.user.id);
  }

  @Get(':id')
  async getCodeBreakerById(@Param('id') id: string) {
    return await this.codeBreakerService.getCodeBreakerById(parseInt(id));
  }

  @Post()
  @UseGuards(OptionalAuthGuard)
  async createCodeBreaker(@Body() dto: CreateCodeBreakerDto, @Req() req: any) {
    return await this.codeBreakerService.createCodeBreaker(dto, req.user.id);
  }

  @Post(':id/guess')
  async codeBreakerGuess(
    @Body() dto: CodeBreakerGuessDto,
    @Param('id') id: string,
  ) {
    return await this.codeBreakerService.codeBreakerGuess(dto, parseInt(id));
  }
}
