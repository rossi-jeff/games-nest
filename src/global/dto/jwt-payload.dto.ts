import { ApiProperty } from '@nestjs/swagger';

export class JwtPayloadDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  UserName: string;

  @ApiProperty()
  iat: number;
}
