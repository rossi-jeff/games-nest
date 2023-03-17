import { ResponseBaseModelDto } from './response-base-model.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Key, KeyArray } from '../enum/key.enum';

export class ReponseCodeBreakerGuessKeyDto extends ResponseBaseModelDto {
  @ApiProperty({ enum: KeyArray })
  Key: Key;
}
