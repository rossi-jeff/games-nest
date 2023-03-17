import { ApiProperty } from '@nestjs/swagger';

export class ResponseBaseModelDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  created_at: string;

  @ApiProperty()
  updated_at: string;
}