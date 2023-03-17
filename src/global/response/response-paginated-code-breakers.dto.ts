import { ApiProperty } from '@nestjs/swagger';
import { ResponseCodeBreakerDto } from './response-code-breaker.dto';
import { ResponsePaginatedDto } from './response-paginated.dto';

export class ResponsePaginatedCodeBreakersDto extends ResponsePaginatedDto {
  @ApiProperty({ type: [ResponseCodeBreakerDto] })
  Items: ResponseCodeBreakerDto[];
}
