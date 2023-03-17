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
import { ApiTags, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { ResponseCodeBreakerDto } from '../global/response/response-code-breaker.dto';
import { ResponseCodeBreakerGuessDto } from '../global/response/response-code-breaker-guess.dto';
import { ResponsePaginatedCodeBreakersDto } from '../global/response/response-paginated-code-breakers.dto';
import { PaginatedQueryDto } from '../global/dto/paginated-query.dto';

@ApiTags('Code Breaker')
@Controller('code_breaker')
export class CodeBreakerController {
  constructor(private codeBreakerService: CodeBreakerService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'paginated list of code breakers',
    type: ResponsePaginatedCodeBreakersDto,
  })
  @ApiQuery({ type: PaginatedQueryDto })
  async paginatedCodeBreakers(
    @Query() query: { Limit?: string; Offset?: string },
  ) {
    return await this.codeBreakerService.paginatedCodeBreakers(query);
  }

  @Get('progress')
  @UseGuards(OptionalAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'list of in progress code breakers',
    type: [ResponseCodeBreakerDto],
  })
  async inProgressCodeBreakers(@Req() req: any) {
    return await this.codeBreakerService.inProgressCodeBreakers(req.user.id);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'code breaker',
    type: ResponseCodeBreakerDto,
  })
  async getCodeBreakerById(@Param('id') id: string) {
    return await this.codeBreakerService.getCodeBreakerById(parseInt(id));
  }

  @Post()
  @UseGuards(OptionalAuthGuard)
  @ApiResponse({
    status: 201,
    description: 'code breaker',
    type: ResponseCodeBreakerDto,
  })
  async createCodeBreaker(@Body() dto: CreateCodeBreakerDto, @Req() req: any) {
    return await this.codeBreakerService.createCodeBreaker(dto, req.user.id);
  }

  @Post(':id/guess')
  @ApiResponse({
    status: 201,
    description: 'code breaker guess',
    type: ResponseCodeBreakerGuessDto,
  })
  async codeBreakerGuess(
    @Body() dto: CodeBreakerGuessDto,
    @Param('id') id: string,
  ) {
    return await this.codeBreakerService.codeBreakerGuess(dto, parseInt(id));
  }
}
