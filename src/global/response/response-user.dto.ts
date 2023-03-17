import { ApiProperty } from '@nestjs/swagger';
import { ResponseBaseModelDto } from './response-base-model.dto';

export class ResponseUserDto extends ResponseBaseModelDto {
  @ApiProperty()
  UserName: string;
}
