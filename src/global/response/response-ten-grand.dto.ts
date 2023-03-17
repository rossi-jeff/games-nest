import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { GameStatus, GameStatusArray } from '../enum/game-status.enum';
import { ResponseBaseModelDto } from './response-base-model.dto';
import { ResponseTenGrandTurnDto } from './response-ten-grand-turn.dto';
import { ResponseUserDto } from './response-user.dto';

export class ResponseTenGrandDto extends ResponseBaseModelDto {
  @ApiProperty({ enum: GameStatusArray })
  Status: GameStatus;

  @ApiProperty()
  Score: number;

  @ApiPropertyOptional({ type: ResponseUserDto })
  user: ResponseUserDto;

  @ApiPropertyOptional({ type: [ResponseTenGrandTurnDto] })
  turns: ResponseTenGrandTurnDto[];
}
