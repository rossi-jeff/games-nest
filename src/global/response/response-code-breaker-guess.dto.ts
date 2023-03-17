import { ApiPropertyOptional } from '@nestjs/swagger';
import { ResponseBaseModelDto } from './response-base-model.dto';
import { CodeBreakerGuessColorDto } from './response-code-breaker-guess-color.dto';
import { ReponseCodeBreakerGuessKeyDto } from './response-code-breaker-guess-key.dto';

export class ResponseCodeBreakerGuessDto extends ResponseBaseModelDto {
  @ApiPropertyOptional({ type: [CodeBreakerGuessColorDto] })
  colors: CodeBreakerGuessColorDto[];

  @ApiPropertyOptional({ type: [ReponseCodeBreakerGuessKeyDto] })
  keys: ReponseCodeBreakerGuessKeyDto[];
}
