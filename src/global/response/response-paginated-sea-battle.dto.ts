import { ApiProperty } from '@nestjs/swagger';
import { ResponsePaginatedDto } from './response-paginated.dto';
import { ResponseSeaBattleDto } from './response-sea-battle.dto';

export class ResponsePaginatedSeBattleDto extends ResponsePaginatedDto {
  @ApiProperty({ type: [ResponseSeaBattleDto] })
  Items: ResponseSeaBattleDto[];
}
