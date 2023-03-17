import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ResponseBaseModelDto } from './response-base-model.dto';
import { ResponseUserDto } from './response-user.dto';
import { ResponseYachtTurnDto } from './response-yacht-turn.dto';

export class ResponseYachtDto extends ResponseBaseModelDto {
  @ApiProperty()
  Total: number;

  @ApiProperty()
  NumTurns: number;

  @ApiPropertyOptional({ type: ResponseUserDto })
  user: ResponseUserDto;

  @ApiPropertyOptional({ type: [ResponseYachtTurnDto] })
  turns: ResponseYachtTurnDto;
}
