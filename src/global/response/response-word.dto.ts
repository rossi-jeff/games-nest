import { ApiProperty } from '@nestjs/swagger';
import { ResponseBaseModelDto } from './response-base-model.dto';

export class ResponseWordDto extends ResponseBaseModelDto {
  @ApiProperty()
  Word: string;

  @ApiProperty()
  Length: number;
}
