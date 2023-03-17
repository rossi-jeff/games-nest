import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty()
  UserName: string;

  @ApiProperty()
  password: string;
}
