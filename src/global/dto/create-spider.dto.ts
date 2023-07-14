import { ApiProperty } from '@nestjs/swagger';

export class CreateSpiderDto {
  @ApiProperty()
  Suits: number;
}
