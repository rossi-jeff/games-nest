import { ApiProperty } from '@nestjs/swagger';

export class ResponseLoginDto {
  @ApiProperty()
  UserName: string;

  @ApiProperty()
  Token: string;
}
